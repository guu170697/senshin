function getSelectedValue() {
    var selectBox = document.getElementById("selectSport");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  
    var baseURL = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
    var completeURL = baseURL + selectedValue + ".json";

    let url = completeURL;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(weather) {
            console.log(weather);
            // 特定の地域(今回は東京)だけ選択して変数に詰め直す
            let area = weather[0].timeSeries[0].areas[0];
            console.log(area); 
            // 発表者と報告日時の情報を画面に書き出す
            document.getElementById("reportDatetime").lastElementChild.textContent = weather[0].reportDatetime;
            // 特定地域の情報を画面に書き出す
            document.getElementById("today").lastElementChild.textContent = area.weathers[0];
            document.getElementById("tomorrow").lastElementChild.textContent = area.weathers[1];
            document.getElementById("dayAfterTomorrow").lastElementChild.textContent = area.weathers[2];
        });

}

function showClock() {
    let nowTime = new Date();
    let nowHour = nowTime.getHours();
    let nowMin  = nowTime.getMinutes();
    let nowSec  = nowTime.getSeconds();
    let msg = "現在時刻：" + nowHour + ":" + nowMin + ":" + nowSec;
    document.getElementById("realtime").innerHTML = msg;
  }
  setInterval('showClock()',1000);

  var text2 = document.getElementById("text2");
    		if(text2) {
      			text2.addEventListener("click", function () {
        				window.open("https://job.mynavi.jp/start/?gad_source=1&gclid=CjwKCAiA-bmsBhAGEiwAoaQNmhkXGHJImVr2Aob0ghltKNBl5sc7ZrW2cbgq4u1aIPRccfdTQHE6UxoCoOkQAvD_BwE");
      			});
    		}
    		
    		var text3 = document.getElementById("text3");
    		if(text3) {
      			text3.addEventListener("click", function (e) {
        				// Add your code here
      			});
    		}
    		
    		var text4 = document.getElementById("text4");
    		if(text4) {
      			text4.addEventListener("click", function () {
        				window.open("https://townwork.net/magazine/knowhow/low/30129/");
      			});
    		}
    		
    		var text5 = document.getElementById("text5");
    		if(text5) {
      			text5.addEventListener("click", function () {
        				window.open("https://drive.google.com/drive/folders/13Wl4svEx_z7EcFxYd2BHR8aQoQvfK8uf?usp=sharing");
      			});
    		}
    		
    		var text6 = document.getElementById("text6");
    		if(text6) {
      			text6.addEventListener("click", function () {
        				window.open("https://x.com/meilink_?s=20");
      			});
    		}
    		
    		var text7 = document.getElementById("text7");
    		if(text7) {
      			text7.addEventListener("click", function () {
        				window.open("https://ccvsd1.meijo-u.ac.jp/pc/top");
      			});
    		}
    		
    		var text8 = document.getElementById("text8");
    		if(text8) {
      			text8.addEventListener("click", function () {
        				window.open("https://x.com/meilink_?s=20");
      			});
    		}
    		
    		var text9 = document.getElementById("text9");
    		if(text9) {
      			text9.addEventListener("click", function () {
        				window.open("https://unityroom.com/");
      			});
    		}
    		
    		var text10 = document.getElementById("text10");
    		if(text10) {
      			text10.addEventListener("click", function (e) {
        				// Add your code here
      			});
    		}
    		
    		var picPresenImage = document.getElementById("picPresenImage");
    		if(picPresenImage) {
      			picPresenImage.addEventListener("click", function () {
        				window.open("https://www.wantedly.com/companies/company_3244501/post_articles/396792");
      			});
    		}
    		
    		var picYarukotoImage = document.getElementById("picYarukotoImage");
    		if(picYarukotoImage) {
      			picYarukotoImage.addEventListener("click", function () {
        				window.open("https://web-camp.io/magazine/archives/54844");
      			});
    		}
    		
    		var picKijiImage = document.getElementById("picKijiImage");
    		if(picKijiImage) {
      			picKijiImage.addEventListener("click", function (e) {
        				// Add your code here
      			});
    		}
    		
    		var picCircleImage = document.getElementById("picCircleImage");
    		if(picCircleImage) {
      			picCircleImage.addEventListener("click", function () {
        				window.open("https://x.com/meilink_?s=20");
      			});
    		}
    		
    		var container2 = document.getElementById("container2");
    		if(container2) {
      			container2.addEventListener("click", function () {
        				window.open("https://unityroom.com/");
      			});
    		}
    		
    		var container3 = document.getElementById("container3");
    		if(container3) {
      			container3.addEventListener("click", function () {
        				window.open("https://x.com/meilink_?s=20");
      			});
    		}
    		
    		var picSyukatsuImage = document.getElementById("picSyukatsuImage");
    		if(picSyukatsuImage) {
      			picSyukatsuImage.addEventListener("click", function () {
        				window.open("https://job.mynavi.jp/start/?gad_source=1&gclid=CjwKCAiA-bmsBhAGEiwAoaQNmhkXGHJImVr2Aob0ghltKNBl5sc7ZrW2cbgq4u1aIPRccfdTQHE6UxoCoOkQAvD_BwE");
      			});
    		}
    		
    		var groupContainer2 = document.getElementById("groupContainer2");
    		if(groupContainer2) {
      			groupContainer2.addEventListener("click", function () {
        				window.open("https://ccvsd1.meijo-u.ac.jp/pc/top");
      			});
    		}
    		
    		var container5 = document.getElementById("container5");
    		if(container5) {
      			container5.addEventListener("click", function (e) {
        				// Add your code here
      			});
    		}
    		
    		var picTaisakuImage = document.getElementById("picTaisakuImage");
    		if(picTaisakuImage) {
      			picTaisakuImage.addEventListener("click", function () {
        				window.open("https://drive.google.com/drive/folders/13Wl4svEx_z7EcFxYd2BHR8aQoQvfK8uf?usp=sharing");
      			});
    		}
    		
    		var container6 = document.getElementById("container6");
    		if(container6) {
      			container6.addEventListener("click", function () {
        				window.open("https://drive.google.com/drive/folders/13Wl4svEx_z7EcFxYd2BHR8aQoQvfK8uf?usp=sharing");
      			});
    		}
    		
    		var container7 = document.getElementById("container7");
    		if(container7) {
      			container7.addEventListener("click", function () {
        				window.open("https://townwork.net/magazine/knowhow/low/30129/");
      			});
    		}