import { filterOutKeys } from "../utils";
import { Http } from "../interface";
import models from "../models";
import { Transaction } from "sequelize";
import sequelize from "../config/database";

const {
    api_category: ApiCategory,
    api_config: ApiConfig,
    api_request: ApiRequest,
    request_param: RequestParam,
    api_header: ApiHeader,
    request_body_form: RequestBodyForm,
    request_body_form_x: RequestBodyFormX,
} = models;

// TODO: 类型待校验
async function buildConfigsTree(
    projectId: number
): Promise<Http.ResTree | null> {
    // 查询指定项目的目录
    const categoryData = (
        await ApiCategory.findAll({ where: { project_id: projectId } })
    ).map((cat) => filterOutKeys(cat.dataValues, ["project_id"]));

    const totalData = [];

    // 查询每个目录下的接口并合并
    for (const category of categoryData) {
        const configs = (
            await ApiConfig.findAll({ where: { category_id: category.id } })
        ).map((config) => config.dataValues);
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
                const prevObj = { ...itemMap.get(item.id), type: "project" };
                treeObj = prevObj;
            } else {
                const parent = itemMap.get(item.parent_id);
                if (parent) {
                    const prevObj = { ...itemMap.get(item.id), type: "dir" };
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
        const category = await ApiCategory.findByPk(categoryId);
        if (!category) {
            throw new Error("Category not found");
        }

        const apis = await ApiConfig.findAll({
            where: { category_id: categoryId },
        });

        const result = {
            directoryName: category.category_name || "",
            children: await Promise.all(
                apis.map(async (api) => {
                    const request = await ApiRequest.findOne({
                        where: { api_id: api.id },
                    });
                    return {
                        id: api.id.toString(),
                        name: api.api_name || "",
                        method: request ? request.method : "Unknown",
                    };
                })
            ),
        };

        return result;
    } catch (error) {
        console.error("Error fetching category by id:", error);
        throw error;
    }
}

async function getApiConfigDetails(
    apiConfigId: number
): Promise<Http.ResConfig> {
    try {
        const apiConfig = await ApiConfig.findByPk(apiConfigId);

        if (!apiConfig) {
            throw new Error("ApiConfig not found");
        }

        const apiRequest = await ApiRequest.findOne({
            where: { api_id: apiConfigId },
        });
        if (apiRequest) {
            const queryParams = await RequestParam.findAll({
                where: { request_id: apiRequest.id },
            });
            const queryHeaders = await ApiHeader.findAll({
                where: { request_id: apiRequest.id },
            });
            const queryBodyForm = await RequestBodyForm.findAll({
                where: { request_id: apiRequest.id },
            });
            const queryBodyFormX = await RequestBodyFormX.findAll({
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
                    description: "Query Body Form",
                })),
                queryBodyFormX: queryBodyFormX.map((formX) => ({
                    key: formX.field_name,
                    value: formX.field_value,
                    description: "Query Body FormX",
                })),
                queryJsonBody: apiRequest.body_json
                    ? JSON.stringify(apiRequest.body_json)
                    : "",
                queryXmlBody: apiRequest.body_xml,
                queryRawBody: apiRequest.body_raw,
            };
            // TODO: creator项 updateTime项 createTime项待添加
            return result as Http.ResConfig;
        }
        return {} as Http.ResConfig;
    } catch (error) {
        console.error("Error fetching ApiConfig details:", error);
        throw error;
    }
}

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

async function updateApiConfigDetails(config: Http.ReqUpdate) {
    const transaction = await sequelize.transaction();
    try {
        const apiConfig = await ApiConfig.findByPk(config.apiId, {
            transaction,
        });
        if (!apiConfig) {
            throw new Error("ApiConfig not found");
        }

        await apiConfig.update(
            {
                api_name: config.name,
                category_id: config.categoryId,
            },
            { transaction }
        );

        const apiRequest = await ApiRequest.findOne({
            where: { api_id: config.apiId },
            transaction,
        });

        if (apiRequest) {
            // Update api request
            await apiRequest.update(
                {
                    method: config.requestMethod as Method,
                    api_url: config.apiUrl,
                    api_auth: config.authType,
                    body_json: config.queryJsonBody
                        ? JSON.parse(config.queryJsonBody)
                        : null,
                    body_xml: config.queryXmlBody,
                    body_raw: config.queryRawBody,
                },
                { transaction }
            );

            // 获取现有的查询参数、请求头、表单数据
            const [queryParams, queryHeaders, queryBodyForm, queryBodyFormX] =
                await Promise.all([
                    RequestParam.findAll({
                        where: { request_id: apiRequest.id },
                        transaction,
                    }),
                    ApiHeader.findAll({
                        where: { request_id: apiRequest.id },
                        transaction,
                    }),
                    RequestBodyForm.findAll({
                        where: { request_id: apiRequest.id },
                        transaction,
                    }),
                    RequestBodyFormX.findAll({
                        where: { request_id: apiRequest.id },
                        transaction,
                    }),
                ]);

            // Update query params
            await updateOrCreateEntries(
                RequestParam,
                queryParams,
                config.queryParams,
                apiRequest.id,
                transaction,
                "param_name",
                "param_value",
                "param_description"
            );

            // Update query headers
            await updateOrCreateEntries(
                ApiHeader,
                queryHeaders,
                config.queryHeaders,
                apiRequest.id,
                transaction,
                "header_name",
                "header_value",
                "description"
            );

            // Update query body form
            await updateOrCreateEntries(
                RequestBodyForm,
                queryBodyForm,
                config.queryBodyForm,
                apiRequest.id,
                transaction,
                "field_name",
                "field_value"
            );

            // Update query body form x
            await updateOrCreateEntries(
                RequestBodyFormX,
                queryBodyFormX,
                config.queryBodyFormX,
                apiRequest.id,
                transaction,
                "field_name",
                "field_value"
            );
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.error("Error updating ApiConfig details:", error);
        throw error;
    }
}

async function updateOrCreateEntries<T extends { [key: string]: any }>(
    model: any,
    existingEntries: T[],
    newEntries:
        | { key: string; value: string; description?: string }[]
        | undefined,
    requestId: number,
    transaction: Transaction,
    keyField: string,
    valueField: string,
    descriptionField?: string
) {
    if (!newEntries) return;

    const newEntriesMap = new Map(
        newEntries.map((entry) => [entry.key, entry])
    );

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
        const apiConfig = await ApiConfig.create({
            api_name: config.name,
            category_id: config.categoryId,
        });

        const apiRequest = await ApiRequest.create({
            api_id: apiConfig.id,
            method: "GET",
            api_url: "",
            api_auth: "None",
        });
    } catch (error) {
        console.error("Error adding ApiConfig details:", error);
        throw error;
    }
}

export {
    buildConfigsTree,
    getCategoryById,
    getApiConfigDetails,
    updateApiConfigDetails,
    addApiConfigDetails,
};
