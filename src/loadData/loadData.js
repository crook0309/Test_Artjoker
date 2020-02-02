function  loadData() {
    let url = 'https://gorest.co.in/public-api/users?access-token=mgU_61QmKy06lCimGL-q5CS36XKKySd2BFVp';
   fetch ( url )
    .then ( response => {
        response.json().then ( response => response
        )
    })
}

export default loadData;
