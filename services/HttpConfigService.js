const ApiCategory = require('../models/api_category');
const ApiConfig = require('../models/api_config');
const ApiRequest = require('../models/api_request');
const ApiResponse = require('../models/api_response');
const ApiHeader = require('../models/api_header');
const RequestBodyForm = require('../models/request_body_form');
const RequestBodyFormX = require('../models/request_body_form_x');
const RequestParam = require('../models/request_param');
const AchsUser = require('../models/achs_user');

async function buildTree(projectId) {
    // 查询指定项目的目录和接口数据
    const categories = await ApiCategory.findAll({where: {project_id: projectId}});
    const apis = await ApiConfig.findAll({
        include: {
            model: ApiCategory,
            as: 'category',
            where: {project_id: projectId}
        }
    });

    // 定义递归函数来构建树形结构
    function buildNode(category) {
        // 在目录下找到子目录和接口
        const childrenCategories = categories.filter(cat => cat.parent_id === category.id);
        const childrenAPIs = apis.filter(api => api.category_id === category.id);

        // 递归构建子节点
        const children = childrenCategories.map(buildNode).concat(childrenAPIs.map(api => ({
            id: api.id.toString(),
            name: api.api_name,
            type: 'api'
        })));

        // 返回当前目录节点
        return {
            id: category.id.toString(),
            name: category.category_name,
            type: category.parent_id === null ? 'project' : 'dir',
            children: children
        };
    }

    // 找到顶层目录，开始构建树
    const rootCategories = categories.filter(cat => !cat.parent_id);
    const tree = rootCategories.map(buildNode);

    return tree;
}

async function getCategoryById(categoryId) {
    try {
        const category = await ApiCategory.findByPk(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }

        const apis = await ApiConfig.findAll({
            where: {category_id: categoryId}
        });

        const result = {
            directoryName: category.category_name,
            children: await Promise.all(apis.map(async api => {
                // 查询 ApiRequest 表获取方法信息
                const request = await ApiRequest.findOne({
                    where: {api_id: api.id}
                });
                return {
                    id: api.id.toString(),
                    name: api.api_name,
                    method: request ? request.method : 'Unknown'
                };
            }))
        };

        return result;
    } catch (error) {
        console.error('Error fetching category by id:', error);
        throw error;
    }
}

async function getApiConfigDetails(apiConfigId) {
    try {
        // 查询 ApiConfig 的基本信息
        const apiConfig = await ApiConfig.findByPk(apiConfigId);

        if (!apiConfig) {
            throw new Error('ApiConfig not found');
        }

        // 查询 ApiRequest 的详细信息
        const apiRequest = await ApiRequest.findOne({where: {api_id: apiConfigId}});
        const queryParams = await RequestParam.findAll({where: {request_id: apiRequest.id}});
        const queryHeaders = await ApiHeader.findAll({where: {request_id: apiRequest.id}});
        const queryBodyForm = await RequestBodyForm.findAll({where: {request_id: apiRequest.id}});
        const queryBodyFormX = await RequestBodyFormX.findAll({where: {request_id: apiRequest.id}});
        // const apiResponse = await ApiResponse.findOne({where: {api_id: apiConfigId}});

        // 构建返回对象
        const result = {
            name: apiConfig.api_name,
            requestMethod: apiRequest.method,
            apiUrl: apiRequest.api_url,
            authType: apiRequest.api_auth,
            queryParams: queryParams.map(param => ({
                key: param.param_name,
                value: param.param_value,
                description: 'Query Parameter'
            })),
            queryHeaders: queryHeaders.map(header => ({
                key: header.header_name,
                value: header.header_value,
                description: 'Query Header'
            })),
            queryBodyForm: queryBodyForm.map(form => ({
                key: form.field_name,
                value: form.field_value,
                description: 'Query Body Form'
            })),
            queryBodyFormX: queryBodyFormX.map(formX => ({
                key: formX.field_name,
                value: formX.field_value,
                description: 'Query Body FormX'
            })),
            queryJsonBody: JSON.stringify(apiRequest.body_json),
            queryXmlBody: apiRequest.body_xml,
            queryRawBody: apiRequest.body_raw,
        };

        return result;
    } catch (error) {
        console.error('Error fetching ApiConfig details:', error);
        throw error;
    }
}

module.exports = {
    buildTree,
    getCategoryById,
    getApiConfigDetails
};
