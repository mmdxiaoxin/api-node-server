const ApiCategory = require('../models/api_category');
const ApiConfig = require('../models/api_config');
const ApiRequest = require('../models/api_request');

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


module.exports = {
    buildTree,
    getCategoryById
};
