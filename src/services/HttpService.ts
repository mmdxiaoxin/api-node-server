import { filterOutKeys } from '../utils';
import { Http } from '../interface';
import models from '../models';
import { Transaction } from 'sequelize';
import sequelize from '../config/database';

const {
    api_category,
    api_config,
    api_request,
    request_param,
    api_header,
    request_body_form,
    request_body_form_x,
} = models;

// TODO: 类型待校验
async function buildConfigsTree(projectId: number): Promise<Http.ResTree | null> {
    // 查询指定项目的目录
    const categoryData = (await api_category.findAll({ where: { project_id: projectId } })).map((cat) =>
        filterOutKeys(cat.dataValues, ['project_id'])
    );

    const totalData = [];

    // 查询每个目录下的接口并合并
    for (const category of categoryData) {
        const configs = (await api_config.findAll({ where: { category_id: category.id } })).map(
            (config) => config.dataValues
        );
        totalData.push({ ...category, configs });
    }

    // 定义递归函数来构建树形结构
    function buildTree(items: any[]) {
        let treeObj = null;
        const itemMap = new Map();

        items.forEach((item: { id: any }) => {
            itemMap.set(item.id, { ...item, children: [] });
        });

        items.forEach((item: { parent_id: null; id: any }) => {
            if (item.parent_id === null) {
                const prevObj = { ...itemMap.get(item.id), type: 'project' };
                treeObj = prevObj;
            } else {
                const parent = itemMap.get(item.parent_id);
                if (parent) {
                    const prevObj = { ...itemMap.get(item.id), type: 'dir' };
                    parent.children.push(prevObj);
                }
            }
        });

        return treeObj;
    }

    return buildTree(totalData);
}

async function getCategoryById(categoryId: number): Promise<Http.ResDirectory> {
    try {
        const category = await api_category.findByPk(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }

        const apis = await api_config.findAll({
            where: { category_id: categoryId },
        });

        const result = {
            directoryName: category.category_name || '',
            children: await Promise.all(
                apis.map(async (api) => {
                    const request = await api_request.findOne({
                        where: { api_id: api.id },
                    });
                    return {
                        id: api.id.toString(),
                        name: api.api_name || '',
                        method: request ? request.method : 'Unknown',
                    };
                })
            ),
        };

        return result;
    } catch (error) {
        console.error('Error fetching category by id:', error);
        throw error;
    }
}

async function getApiConfigDetails(apiConfigId: number): Promise<Http.ResConfig> {
    try {
        const apiConfig = await api_config.findByPk(apiConfigId);

        if (!apiConfig) {
            throw new Error('ApiConfig not found');
        }

        const apiRequest = await api_request.findOne({
            where: { api_id: apiConfigId },
        });
        if (apiRequest) {
            const queryParams = await request_param.findAll({
                where: { request_id: apiRequest.id },
            });
            const queryHeaders = await api_header.findAll({
                where: { request_id: apiRequest.id },
            });
            const queryBodyForm = await request_body_form.findAll({
                where: { request_id: apiRequest.id },
            });
            const queryBodyFormX = await request_body_form_x.findAll({
                where: { request_id: apiRequest.id },
            });
            const result = {
                name: apiConfig.api_name,
                requestMethod: apiRequest.method,
                apiUrl: apiRequest.api_url,
                authType: apiRequest.api_auth,
                queryParams: queryParams.map((param) => ({
                    key: param.param_name,
                    value: param.param_value,
                    description: param.param_description,
                })),
                queryHeaders: queryHeaders.map((header) => ({
                    key: header.header_name,
                    value: header.header_value,
                    description: header.description,
                })),
                queryBodyForm: queryBodyForm.map((form) => ({
                    key: form.field_name,
                    value: form.field_value,
                    description: 'Query Body Form',
                })),
                queryBodyFormX: queryBodyFormX.map((formX) => ({
                    key: formX.field_name,
                    value: formX.field_value,
                    description: 'Query Body FormX',
                })),
                queryJsonBody: apiRequest.body_json ? JSON.stringify(apiRequest.body_json) : '',
                queryXmlBody: apiRequest.body_xml,
                queryRawBody: apiRequest.body_raw,
            };
            // TODO: creator项 updateTime项 createTime项待添加
            return result as Http.ResConfig;
        }
        return {} as Http.ResConfig;
    } catch (error) {
        console.error('Error fetching ApiConfig details:', error);
        throw error;
    }
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

async function updateApiConfigDetails(config: Http.ReqUpdate) {
    const transaction = await sequelize.transaction();
    try {
        const apiConfig = await api_config.findByPk(config.apiId, {
            transaction,
        });
        if (!apiConfig) {
            throw new Error('ApiConfig not found');
        }

        // 只更新存在的字段
        const updatedConfigFields: Partial<typeof apiConfig> = {};
        if (config.name) updatedConfigFields.api_name = config.name;
        if (config.categoryId) updatedConfigFields.category_id = config.categoryId;

        await apiConfig.update(updatedConfigFields, { transaction });

        const apiRequest = await api_request.findOne({
            where: { api_id: config.apiId },
            transaction,
        });

        if (apiRequest) {
            // 只更新存在的字段
            const updatedRequestFields: Partial<typeof apiRequest> = {};
            if (config.requestMethod) updatedRequestFields.method = config.requestMethod as Method;
            if (config.apiUrl) updatedRequestFields.api_url = config.apiUrl;
            if (config.authType) updatedRequestFields.api_auth = config.authType;
            if (config.queryJsonBody) updatedRequestFields.body_json = JSON.parse(config.queryJsonBody);
            if (config.queryXmlBody) updatedRequestFields.body_xml = config.queryXmlBody;
            if (config.queryRawBody) updatedRequestFields.body_raw = config.queryRawBody;

            // Update api request only if there are fields to update
            if (Object.keys(updatedRequestFields).length > 0) {
                await apiRequest.update(updatedRequestFields, { transaction });
            }

            // 获取现有的查询参数、请求头、表单数据
            const [queryParams, queryHeaders, queryBodyForm, queryBodyFormX] = await Promise.all([
                request_param.findAll({
                    where: { request_id: apiRequest.id },
                    transaction,
                }),
                api_header.findAll({
                    where: { request_id: apiRequest.id },
                    transaction,
                }),
                request_body_form.findAll({
                    where: { request_id: apiRequest.id },
                    transaction,
                }),
                request_body_form_x.findAll({
                    where: { request_id: apiRequest.id },
                    transaction,
                }),
            ]);

            // 更新时只处理存在的字段
            if (config.queryParams) {
                await updateOrCreateEntries(
                    request_param,
                    queryParams,
                    config.queryParams,
                    apiRequest.id,
                    transaction,
                    'param_name',
                    'param_value',
                    'param_description'
                );
            }

            if (config.queryHeaders) {
                await updateOrCreateEntries(
                    api_header,
                    queryHeaders,
                    config.queryHeaders,
                    apiRequest.id,
                    transaction,
                    'header_name',
                    'header_value',
                    'description'
                );
            }

            if (config.queryBodyForm) {
                await updateOrCreateEntries(
                    request_body_form,
                    queryBodyForm,
                    config.queryBodyForm,
                    apiRequest.id,
                    transaction,
                    'field_name',
                    'field_value'
                );
            }

            if (config.queryBodyFormX) {
                await updateOrCreateEntries(
                    request_body_form_x,
                    queryBodyFormX,
                    config.queryBodyFormX,
                    apiRequest.id,
                    transaction,
                    'field_name',
                    'field_value'
                );
            }
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.error('Error updating ApiConfig details:', error);
        throw error;
    }
}

async function updateOrCreateEntries<T extends { [key: string]: any }>(
    model: any,
    existingEntries: T[],
    newEntries: { key: string; value: string; description?: string }[] | undefined,
    requestId: number,
    transaction: Transaction,
    keyField: string,
    valueField: string,
    descriptionField?: string
) {
    if (!newEntries) return;

    const newEntriesMap = new Map(newEntries.map((entry) => [entry.key, entry]));

    // 更新或删除现有条目
    for (const entry of existingEntries) {
        const newEntry = newEntriesMap.get(entry[keyField]);
        if (newEntry) {
            const updateData: { [key: string]: any } = {
                [keyField]: newEntry.key,
                [valueField]: newEntry.value,
            };
            if (descriptionField && newEntry.description) {
                updateData[descriptionField] = newEntry.description;
            }
            await entry.update(updateData, { transaction });
            newEntriesMap.delete(newEntry.key);
        } else {
            await entry.destroy({ transaction });
        }
    }

    // 创建新条目
    for (const newEntry of newEntriesMap.values()) {
        const createData: { [key: string]: any } = {
            request_id: requestId,
            [keyField]: newEntry.key,
            [valueField]: newEntry.value,
        };
        if (descriptionField && newEntry.description) {
            createData[descriptionField] = newEntry.description;
        }
        await model.create(createData, { transaction });
    }
}

async function addApiConfigDetails(config: Http.ReqAdd) {
    try {
        const apiConfig = await api_config.create({
            api_name: config.name,
            category_id: config.categoryId,
        });

        await api_request.create({
            api_id: apiConfig.id,
            method: 'GET',
            api_url: '',
            api_auth: 'None',
        });
    } catch (error) {
        console.error('Error adding ApiConfig details:', error);
        throw error;
    }
}

async function deleteApiConfig(apiConfigId: number): Promise<void> {
    const transaction = await sequelize.transaction();
    try {
        // 查找 API 配置
        const apiConfig = await api_config.findByPk(apiConfigId, { transaction });
        if (!apiConfig) {
            throw new Error('ApiConfig not found');
        }

        // 查找相关的 API 请求信息
        const apiRequest = await api_request.findOne({
            where: { api_id: apiConfigId },
            transaction,
        });

        if (apiRequest) {
            // 删除相关的请求参数、请求头、表单数据
            await Promise.all([
                request_param.destroy({
                    where: { request_id: apiRequest.id },
                    transaction,
                }),
                api_header.destroy({
                    where: { request_id: apiRequest.id },
                    transaction,
                }),
                request_body_form.destroy({
                    where: { request_id: apiRequest.id },
                    transaction,
                }),
                request_body_form_x.destroy({
                    where: { request_id: apiRequest.id },
                    transaction,
                }),
            ]);

            // 删除 API 请求
            await apiRequest.destroy({ transaction });
        }

        // 删除 API 配置
        await apiConfig.destroy({ transaction });

        // 提交事务
        await transaction.commit();
    } catch (error) {
        // 如果发生错误，回滚事务
        await transaction.rollback();
        console.error('Error deleting ApiConfig:', error);
        throw error;
    }
}

export {
    buildConfigsTree,
    getCategoryById,
    getApiConfigDetails,
    updateApiConfigDetails,
    addApiConfigDetails,
    deleteApiConfig,
};
