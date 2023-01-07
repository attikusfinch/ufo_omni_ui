function get_data(name) {
    return localStorage.getItem(name);
}

function create_token() {
    var address_field = document.getElementById("input-address");
    var name_field = document.getElementById("input-name");
    var category_field = document.getElementById("input-category");
    var subcategory_field = document.getElementById("input-subcategory");
    var link_field = document.getElementById("input-link");
    var data_field = document.getElementById("input-data");

    var user = get_data("user");
    var password = get_data("password");
    var ip = get_data("ip");
    var port = get_data("port");

    if (user == null || password == null || ip == null || port == null) {
        alert("С начала укажите данные в настройках");
        return;
    }

    if (name_field.value == "" || address_field.value == "") {
        alert("Поля адресса и имени должны быть заполены");
        return;
    }

    // fetch('/create_token', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             fromAddress: address_field.value,
    //             ecosystem: 1,
    //             type: 5,
    //             previousId: 0,
    //             category: category_field.value,
    //             subcategory: subcategory_field.value,
    //             name: name_field.value,
    //             url: link_field.value,
    //             data: data_field.value
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         alert(data)
    //     });

    const request = new XMLHttpRequest();

    request.open('POST', 'http://localhost:4444/api/create_token');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        fromAddress: address_field.value,
        ecosystem: 1,
        type: 5,
        previousId: 0,
        category: category_field.value,
        subcategory: subcategory_field.value,
        name: name_field.value,
        url: link_field.value,
        data: data_field.value
    }));

    request.onload = () => {
        if (request.status === 200) {
            alert("Token created")
        } else {
            alert('Error');
        }
    }
}