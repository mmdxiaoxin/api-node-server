import { filterOutKeys } from "../utils";
import { api_category as ApiCategory } from "../models/api_category";
import { api_config as ApiConfig } from "../models/api_config";
import { api_request as ApiRequest } from "../models/api_request";
import { api_response as ApiResponse } from "../models/api_response";
import { api_header as ApiHeader } from "../models/api_header";
import { request_body_form as RequestBodyForm } from "../models/request_body_form";
import { request_body_form_x as RequestBodyFormX } from "../models/request_body_form_x";
import { request_param as RequestParam } from "../models/request_param";
import { achs_user as AchsUser } from "../models/achs_user";

interface Category {
    id: number;
    [key: string]: any;
}

interface Config {
    id: number;
    [key: string]: any;
}

interface TreeItem extends Category {
    parent_id: number | null;
    type: string;
    configs: Config[];
    children: TreeItem[];
}

/**
 * 构建接口配置列表树
 * @param projectId
 * @returns {Promise<Object>}
 */
async function buildConfigsTree(projectId: number): Promise<TreeItem | null> {
    const categoryData = (
        await ApiCategory.findAll({ where: { project_id: projectId } })
    ).map((cat) => filterOutKeys(cat.dataValues, ["project_id"]));

    const totalData: TreeItem[] = [];

    for (const category of categoryData) {
        const configs: Config[] = (
            await ApiConfig.findAll({ where: { category_id: category.id } })
        ).map((config) => config.dataValues);
        totalData.push({
            id: category.id || 0,
            ...category,
            configs,
            children: [],
            type: "",
            parent_id: null,
        });
    }

    function buildTree(items: TreeItem[]): TreeItem | null {
        let treeObj: TreeItem | null = null;
        const itemMap: Map<number, TreeItem> = new Map();

        items.forEach((item) => {
            itemMap.set(item.id, { ...item, children: [] });
        });

        items.forEach((item) => {
            if (item.parent_id === null) {
                const prevObj = { ...itemMap.get(item.id), type: "project" };
                treeObj = filterOutKeys(prevObj, ["parent_id"]) as TreeItem;
            } else {
                const parent = itemMap.get(item.parent_id);
                if (parent) {
                    const prevObj = { ...itemMap.get(item.id), type: "dir" };
                    parent.children.push(
                        filterOutKeys(prevObj, ["parent_id"]) as TreeItem
                    );
                }
            }
        });

        return treeObj;
    }

    return buildTree(totalData);
}

async function getCategoryById(categoryId: number): Promise<object> {
    try {
        const category = await ApiCategory.findByPk(categoryId);
        if (!category) {
            throw new Error("Category not found");
        }

        const apis = await ApiConfig.findAll({
            where: { category_id: categoryId },
        });

        const result = {
            directoryName: category.category_name,
            children: await Promise.all(
                apis.map(async (api) => {
                    const request = await ApiRequest.findOne({
                        where: { api_id: api.id },
                    });
                    return {
                        id: api.id.toString(),
                        name: api.api_name,
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

async function getApiConfigDetails(apiConfigId: number) {
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
                queryParams: queryParams.map((param: RequestParam) => ({
                    key: param.param_name,
                    value: param.param_value,
                    description: "Query Parameter",
                })),
                queryHeaders: queryHeaders.map((header) => ({
                    key: header.header_name,
                    value: header.header_value,
                    description: "Query Header",
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
            return result;
        }
    } catch (error) {
        console.error("Error fetching ApiConfig details:", error);
        throw error;
    }
}

export { buildConfigsTree as buildTree, getCategoryById, getApiConfigDetails };
