const AchsProject = require('../models/achs_project'); // 引入定义的模型
const projectData = require('../static/localProject.json'); // 引入给定的数据

async function insertOrUpdateProjects() {
    try {
        for (const project of projectData.projectList) {
            // 检查项目是否已存在于数据库中
            const existingProject = await AchsProject.findOne({ where: { id: project.id } });

            if (existingProject) {
                // 如果项目已存在，则更新其数据
                await existingProject.update({
                    name: project.name,
                    icon: project.icon,
                });
                console.log(`Updated project with ID ${project.id}`);
            } else {
                // 如果项目不存在，则创建新的项目
                await AchsProject.create({
                    id: project.id,
                    name: project.name,
                    icon: project.icon,
                });
                console.log(`Inserted new project with ID ${project.id}`);
            }
        }
        console.log('All projects inserted or updated successfully.');
    } catch (error) {
        console.error('Error inserting or updating projects:', error);
    }
}

// 执行函数来插入或更新项目
insertOrUpdateProjects();
