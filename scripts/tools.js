function find_token() {
    var tx_field = document.getElementById("tx-field");

    var tx_name = document.getElementById("tx_name");
    var tx_url = document.getElementById("tx_url");
    var tx_amount = document.getElementById("tx_amount");

    var nft_image = document.getElementById("nft_image");

    var user = get_data("user");
    var password = get_data("password");
    var ip = get_data("ip");
    var port = get_data("port");

    if (user == null || password == null || ip == null || port == null) {
        alert("С начала укажите данные в настройках");
        return;
    }

    if (tx_field.value == "") {
        alert("Введите транзакцию");
        return;
    }

    const request = new XMLHttpRequest();

    request.open('POST', 'http://localhost:4444/api/get_token');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        user: user,
        pass: password,
        host: ip,
        port: port,
        txid: tx_field.value
    }));

    request.onload = () => {
        if (request.status === 200) {
            const response = get_json(request.response);
            tx_name.textContent = "Название: " + response.name;
            tx_url.textContent = "Ссылка: " + response.url;
            tx_amount.textContent = "Количество: " + response.amount;
            nft_image.src = response.url;
        } else {
            x_text.textContent = get_json(request.response);
        }
    }
}

function get_data(name) {
    return localStorage.getItem(name);
}

function get_json(data) {
    const obj = JSON.parse(data);
    return obj;
}