const AchsProject = require('../models/achs_project');
const sequelize = require('../config/database');

// 创建一个新的项目
async function createProject() {
    try {
        const newProject = await AchsProject.create({
            team_id: 2,
            name: 'New Project'
        });
        console.log('New project created:', newProject.toJSON());
    } catch (error) {
        console.error('Error creating project:', error);
    }
}

// 查询所有项目
async function getAllProjects() {
    try {
        const projects = await AchsProject.findAll();
        console.log('All projects:', projects.map(project => project.toJSON()));
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

// 更新项目名称
async function updateProjectName(projectId, newName) {
    try {
        const project = await AchsProject.findByPk(projectId);
        if (project) {
            await project.update({name: newName});
            console.log('Project name updated:', project.toJSON());
        } else {
            console.error('Project not found');
        }
    } catch (error) {
        console.error('Error updating project name:', error);
    }
}

// 删除项目
async function deleteProject(projectId) {
    try {
        const project = await AchsProject.findByPk(projectId);
        if (project) {
            await project.destroy();
            console.log('Project deleted');
        } else {
            console.error('Project not found');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
    }
}

// 执行示例操作
async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await getAllProjects();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test();

