// ページ読み込み時に入力欄にフォーカスを設定し、card0.jpgを表示
window.onload = function() {
    let cardInput = document.getElementById("cardNumber");
    
    cardInput.focus();
    document.getElementById("cardImage").src = "images/card0.jpg";
    document.getElementById("cardText").innerText = "カードを選択してください。";

    // EnterキーでdisplayCard()を実行
    cardInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            displayCard();
        }
    });
};

function displayCard() {
    let cardNumber = document.getElementById("cardNumber").value;

    // 入力が空なら card0.jpg を表示
    if (!cardNumber) {
        document.getElementById("cardImage").src = "images/card0.jpg";
        document.getElementById("cardText").innerText = "カードを選択してください。";
        return;
    }

    // 入力値が範囲外ならエラーメッセージを表示
    if (cardNumber < 1 || cardNumber > 25) {
        alert("1から25の間の番号を入力してください。");
        return;
    }

    let imagePath = `images/card${cardNumber}.jpg`; // 画像フォルダ内のファイル名
    let textPath = `texts/card${cardNumber}.txt`;   // テキストフォルダ内のファイル名

    // 画像を表示
    let cardImage = document.getElementById("cardImage");
    cardImage.src = imagePath;
    
    // **画像のエラーハンドリング**（画像が存在しない場合、not_found.jpg を表示）
    cardImage.onerror = function() {
        cardImage.src = "images/not_found.jpg";
    };

    // テキストを取得して表示
    fetch(textPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("テキストが見つかりません。");
            }
            return response.text();
        })
        .then(text => {
            document.getElementById("cardText").innerText = text;
        })
        .catch(error => {
            document.getElementById("cardText").innerText = "説明が見つかりません。";
        });
}
