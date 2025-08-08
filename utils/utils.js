const getNewID = activities => {
    //array of id
    const activitiesIds = activities.map((activity) => activity.id);
    //get max id
    const maxId = activitiesIds.reduce((a, b) => Math.max(a, b));
    const id = maxId + 1;
    return id;
}

export { getNewID };