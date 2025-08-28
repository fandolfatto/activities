const getNewID = activities => {
    //array of id
    const activitiesIds = activities.map((activity) => activity.id);
    //get max id
    const maxId = Math.max(...activitiesIds);
    const id = maxId + 1;
    return id;
}

export { getNewID };