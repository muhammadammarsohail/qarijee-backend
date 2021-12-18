const courseNS = require("../models/course.model");

const createCourse = async (course) => {
    try {
        const { _id, name, description } = await courseNS.create(course);
        return { _id, name, description };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getCourseById = async (id) => {
    const course = await courseNS.findOne({ id });
    if (course) {
        const { id, name, description } = course;
        return { id, name, description };  
    }
};

const getAllCourses = async () => {
    let courses = [];
    courses = await courseNS.find();
    if (courses) {
        return courses;  
    }
};

// eslint-disable-next-line
const updateCourse = async (id, toBeUpdated) => { 

};

// eslint-disable-next-line
const deleteCourses = async (ids) => {
    courseNS.deleteMany({ 'id' : { $in: ids } }, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
    });
};

module.exports = {
    createCourse,
    updateCourse,
    deleteCourses,
    getCourseById,
    getAllCourses,
};
