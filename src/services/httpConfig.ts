import { filterOutKeys } from "../utils";
import { Http } from "../interface";
import models from "../models";

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
    try {
        const apiConfig = await ApiConfig.findByPk(config.apiId);
        if (!apiConfig) {
            throw new Error("ApiConfig not found");
        }

        const apiRequest = await ApiRequest.findOne({
            where: { api_id: config.apiId },
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

            // Update api config
            await apiRequest.update({
                method: config.requestMethod as Method,
                api_url: config.apiUrl,
                api_auth: config.authType,
                body_json: config.queryJsonBody
                    ? JSON.parse(config.queryJsonBody)
                    : null,
                body_xml: config.queryXmlBody,
                body_raw: config.queryRawBody,
            });

            // Update query params
            for (const param of queryParams) {
                await param.destroy();
            }
            if (config.queryParams) {
                for (const param of config.queryParams) {
                    await RequestParam.create({
                        request_id: apiRequest.id,
                        param_name: param.key,
                        param_value: param.value,
                        param_description: param.description,
                    });
                }
            }

            // Update query headers
            for (const header of queryHeaders) {
                await header.destroy();
            }
            if (config.queryHeaders) {
                for (const header of config.queryHeaders) {
                    await ApiHeader.create({
                        request_id: apiRequest.id,
                        header_name: header.key,
                        header_value: header.value,
                        description: header.description,
                    });
                }
            }

            // Update query body form
            for (const form of queryBodyForm) {
                await form.destroy();
            }
            if (config.queryBodyForm) {
                for (const form of config.queryBodyForm) {
                    await RequestBodyForm.create({
                        request_id: apiRequest.id,
                        field_name: form.key,
                        field_value: form.value,
                    });
                }
            }

            // Update query body form x
            for (const formX of queryBodyFormX) {
                await formX.destroy();
            }
            if (config.queryBodyFormX) {
                for (const formX of config.queryBodyFormX) {
                    await RequestBodyFormX.create({
                        request_id: apiRequest.id,
                        field_name: formX.key,
                        field_value: formX.value,
                    });
                }
            }
        }
    } catch (error) {
        console.error("Error updating ApiConfig details:", error);
        throw error;
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
