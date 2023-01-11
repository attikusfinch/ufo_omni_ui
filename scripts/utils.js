function get_data(name) {
    return localStorage.getItem(name);
}

function create_nft() {
    var address_field = document.getElementById("input-address");
    var name_field = document.getElementById("input-name");
    var category_field = document.getElementById("input-category");
    var subcategory_field = document.getElementById("input-subcategory");
    var link_field = document.getElementById("input-link");
    var data_field = document.getElementById("input-data");

    var tx_text = document.getElementById("tx_data");

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

    const request = new XMLHttpRequest();

    request.open('POST', 'http://localhost:4444/api/create_nft');
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
        data: data_field.value,
        user: user,
        pass: password,
        host: ip,
        port: port
    }));

    request.onload = () => {
        if (request.status === 200) {
            tx_text.textContent = get_json(request.response);
        } else {
            x_text.textContent = get_json(request.response);
        }
    }
}

function create_token() {
    var address_field = document.getElementById("input-address");
    var name_field = document.getElementById("input-name");
    var category_field = document.getElementById("input-category");
    var subcategory_field = document.getElementById("input-subcategory");
    var link_field = document.getElementById("input-link");
    var data_field = document.getElementById("input-data");
    var amount_field = document.getElementById("input-count");

    var division = document.getElementById("division-switch").checked;

    if (division == true) {
        division = 2
    } else {
        division = 1
    }

    var user = get_data("user");
    var password = get_data("password");
    var ip = get_data("ip");
    var port = get_data("port");

    if (user == null || password == null || ip == null || port == null) {
        alert("С начала укажите данные в настройках");
        return;
    }

    if (name_field.value == "" || address_field.value == "" || amount_field.value == "") {
        alert("Поля адресса и имени должны быть заполены");
        return;
    }

    const request = new XMLHttpRequest();

    request.open('POST', 'http://localhost:4444/api/create_token');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        fromAddress: address_field.value,
        ecosystem: 1,
        type: division,
        previousId: 0,
        category: category_field.value,
        subcategory: subcategory_field.value,
        name: name_field.value,
        url: link_field.value,
        data: data_field.value,
        amount: amount_field.value + '',
        user: user,
        pass: password,
        host: ip,
        port: port
    }));

    request.onload = () => {
        if (request.status === 200) {
            tx_text.textContent = get_json(request.response);
        } else {
            x_text.textContent = get_json(request.response);
        }
    }
}

function get_json(data) {
    const obj = JSON.parse(data);
    return obj.msg;
}