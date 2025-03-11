function displayCard() {
    let cardNumber = document.getElementById("cardNumber").value;

    if (cardNumber < 1 || cardNumber > 25) {
        alert("1から25の間の番号を入力してください。");
        return;
    }

    let imagePath = `images/card${cardNumber}.jpg`; // 画像フォルダ内のファイル名
    let textPath = `texts/card${cardNumber}.txt`;   // テキストフォルダ内のファイル名

    // 画像を表示
    document.getElementById("cardImage").src = imagePath;

    // テキストを取得して表示
    fetch(textPath)
        .then(response => response.text())
        .then(text => {
            document.getElementById("cardText").innerText = text;
        })
        .catch(error => {
            document.getElementById("cardText").innerText = "説明が見つかりません。";
        });
}
