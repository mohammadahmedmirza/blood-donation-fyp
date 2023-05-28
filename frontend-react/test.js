const obj = {
    "status": true,
    "message": "Applications fetched successfully",
    "applications": [
        {
            "_id": "641dd9eff11a302555a3da37",
            "applicationName": "Abdullah",
            "applicationId": "62cf5fe1-90bd-4799-8669-87f19d6132b0",
            "createdAt": "2023-03-24T17:12:15.251Z",
            "updatedAt": "2023-03-24T17:12:15.251Z"
        },
        {
            "_id": "641dd4c4f11a302555a3d9f0",
            "applicationName": "Hamza App",
            "applicationId": "2242a4da-0a6d-4e7f-b4f1-e97d35ebe431",
            "createdAt": "2023-03-24T16:50:12.818Z",
            "updatedAt": "2023-03-24T16:50:12.818Z"
        }
    ]
}

console.log(obj.applications.map((app) => app.applicationName));