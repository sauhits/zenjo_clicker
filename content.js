// content.js の一番上に追加: poyoyon3アニメーションのスタイルを動的に挿入
const style = document.createElement("style");
style.textContent = `
.poyoyon3-animation {
  animation: poyoyon3 2.5s ;
  opacity: 1; /* アニメーションが適用されると常に不透明 */
}

@keyframes poyoyon3 {
  0%, 40% {
    transform: skew(0deg, 0deg);
  }
  5% {
    transform: skew(5deg, 5deg);
  }
  10% {
    transform: skew(-4deg, -4deg);
  }
  15% {
    transform: skew(3deg, 3deg);
  }
  20% {
    transform: skew(-2deg, -2deg);
  }
  25% {
    transform: skew(1deg, 1deg);
  }
  30% {
    transform: skew(-0.6deg, -0.6deg);
  }
  35% {
    transform: skew(0.3deg, 0.3deg);
  }
}
`;
document.head.appendChild(style);

const adBanner = document.createElement("div");
// 最初から最終的な表示位置に設定し、アニメーションなしで表示
adBanner.style.position = "fixed";
adBanner.style.bottom = "10px"; // 下部から10px上に配置
adBanner.style.left = "50%"; // 左端から50%の位置
adBanner.style.transform = "translateX(-50%)"; // 要素の幅の半分だけ左にずらして中央揃え
adBanner.style.width = "30%";
adBanner.style.backgroundColor = "rgb(35, 134, 54)";
adBanner.style.border = "5px solid #ffffff"; // 白い枠線を追加
adBanner.style.padding = "10px";
adBanner.style.textAlign = "center";
adBanner.style.zIndex = "99999";
adBanner.style.opacity = "1"; // 最初から完全に不透明
adBanner.style.borderRadius = "15px"; // 角を丸くする
adBanner.classList.add("poyoyon3-animation"); // 作成時にアニメーションクラスを適用

const adContent = document.createElement("div");
const imageUrl = chrome.runtime.getURL("/images/github_zenjo.png");
adContent.innerHTML = `
  <a href="https://github.com/sauhits/zenjo_clicker" target="_blank">
    <img src="${imageUrl}" alt="My Ad" style="max-width:100%; height:auto; border-radius: 10px;">
  </a>
`;
adBanner.appendChild(adContent);

const closeButtonContainer = document.createElement("div");
closeButtonContainer.style.position = "absolute";
closeButtonContainer.style.top = "5px";
closeButtonContainer.style.right = "10px";
const closeButton = document.createElement("button");
closeButton.innerHTML = "&times;";
closeButton.style.fontSize = "20px";
closeButton.style.border = "none";
closeButton.style.backgroundColor = "transparent";
closeButton.style.color = "#ffffff"; // 閉じるボタンの文字色を白に
closeButton.style.cursor = "pointer";
closeButton.onclick = () => {
  adBanner.remove(); // クリックでバナーをすぐに削除
};
closeButtonContainer.appendChild(closeButton);
adBanner.appendChild(closeButtonContainer);
closeButtonContainer.style.display = "none"; // 最初は非表示

document.body.appendChild(adBanner);

// 5秒後に閉じるボタンを表示
setTimeout(() => {
  closeButtonContainer.style.display = "block";
}, 5000);
