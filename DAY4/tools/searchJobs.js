async function searchJobs({ skill, location, experience }) {
    // Mock data (later this will be real API / DB)
    return [
        {
            company: "TechCorp",
            role: `${skill} Developer`,
            location,
            experience_required: experience,
        },
        {
            company: "StartupX",
            role: `${skill} Engineer`,
            location,
            experience_required: experience + 1,
        },
    ];
}

module.exports = searchJobs;
