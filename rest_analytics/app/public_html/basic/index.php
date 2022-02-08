<?php 
    include $_SERVER['DOCUMENT_ROOT'] . "/auth/priv_check_basic.php"
?>
<!DOCTYPE html>
<html>
    <head>
        <title>User Dashboard</title>
        <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
        <script src="https://cdn.zinggrid.com/zinggrid.min.js"></script>
        <a href="/report.php">Report</a>
        <a href="/auth/logout.php">Logout</a>
    </head>
    <body>
    <div class="chart--main">
      <div>
        <div id="pieChart" class="chart--container"></div>
      </div>
      <div class="chart--row">
        <div id="barChart" class="chart--container"></div>
      </div>
      <zing-grid caption="Initial Interactions of Mobile Users" sort search layout="row" viewport-stop>
  </zing-grid>
    </div>
    <script>
   ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; // window:load event for Javascript to run after HTML
    // because this Javascript is injected into the document head
    function get_data_from_url(url){
            var http_req = new XMLHttpRequest();
            http_req.open("GET",url,false);
            http_req.send(null);
            return http_req.responseText;          
        }
    function getBrowserNum(mobileuserAgent){
        var num_Chrome = 0, num_Safari = 0, num_Firefox = 0, num_Opera = 0;
        for (userAgentString in mobileuserAgent){
            if (mobileuserAgent[userAgentString].indexOf("Chrome") > -1){
                num_Chrome++;
            }
            if (mobileuserAgent[userAgentString].indexOf("Firefox") > -1){
                num_Firefox++;
            }
            if (mobileuserAgent[userAgentString].indexOf("OP") > -1){
                num_Opera++;
            }
            if ((mobileuserAgent[userAgentString].indexOf("Chrome") > -1) && (mobileuserAgent[userAgentString].indexOf("OP") > -1)){
                num_Chrome--;
            }
        }
        return [num_Chrome, 0, num_Firefox, num_Opera];
    }

    function getBrowserIOS(mobileuserAgent){
        var num_Chrome = 0, num_Safari = 0, num_Firefox = 0, num_Opera = 0;
        for (userAgentString in mobileuserAgent){
            if (mobileuserAgent[userAgentString].indexOf("CriOS") > -1){
                num_Chrome++;
            }
            else if (mobileuserAgent[userAgentString].indexOf("FxiOS") > -1){
                num_Firefox++;
            }
            else if (mobileuserAgent[userAgentString].indexOf("OPiOS") > -1){
                num_Opera++;
            }
            else if (mobileuserAgent[userAgentString].indexOf("Safari") > -1){
                num_Safari++;
            }
        }
        return [num_Chrome, num_Safari, num_Firefox, num_Opera];
    }

    // GET DATA **************************************************************
    window.addEventListener('load', () => {
        // Javascript code to execute after DOM content
        fetch('https://cspears.site/api/vizData')
        .then(response => response.json())
        .then(data => { 
            //console.log(data);
            var mobileUser = data.mobileUser;
            var computerUser = data.computerUser;
            var mobileuserAgentAd = data.mobileuserAgentAd;
            var mobileuserAgentIOS = data.mobileuserAgentIOS;
            var Ad_num_Chrome = 0, Ad_num_Safari = 0, Ad_num_Firefox = 0, Ad_num_Opera = 0;
            [Ad_num_Chrome, Ad_num_Safari, Ad_num_Firefox, Ad_num_Opera] = getBrowserNum(mobileuserAgentAd);
            var IOS_num_Chrome = 0, IOS_num_Safari = 0, IOS_num_Firefox = 0, IOS_num_Opera = 0;
            [IOS_num_Chrome, IOS_num_Safari, IOS_num_Firefox, IOS_num_Opera] = getBrowserIOS(mobileuserAgentIOS);
            
            var myConfig = {
  "graphset": [{
    "type": "bar",
    "background-color": "white",
    "title": {
      "text": "Browser Usage of Android vs IOS users",
      "font-color": "#7E7E7E",
      "backgroundColor": "none",
      "font-size": "22px",
      "alpha": 1,
      "adjust-layout": true,
    },
    "plotarea": {
      "margin": "dynamic"
    },
    "legend": {
      "layout": "x3",
      "alpha": 0.05,
      "shadow": false,
      "align": "center",
      "adjust-layout": true,
      "marker": {
        "type": "circle",
        "border-color": "none",
        "size": "10px"
      },
      "border-width": 0,
      "maxItems": 3,
      "toggle-action": "hide",
      "pageOn": {
        "backgroundColor": "#000",
        "size": "10px",
        "alpha": 0.65
      },
      "pageOff": {
        "backgroundColor": "#7E7E7E",
        "size": "10px",
        "alpha": 0.65
      },
      "pageStatus": {
        "color": "black"
      }
    },
    "plot": {
      "bars-space-left": 0.15,
      "bars-space-right": 0.15,
      "animation": {
        "effect": "ANIMATION_SLIDE_BOTTOM",
        "sequence": 0,
        "speed": 800,
        "delay": 800
      }
    },
    "scale-y": {
      "line-color": "#7E7E7E",
      "item": {
        "font-color": "#7e7e7e"
      },
      "values": "0:60:10",
      "guide": {
        "visible": true
      },
      "label": {
        "text": "# of Users",
        "font-family": "arial",
        "bold": true,
        "font-size": "14px",
        "font-color": "#7E7E7E",
      },
    },
    "scaleX": {
      "values": [
        "Chrome",
        "Safari",
        "Firefox",
        "Opera"
      ],
      "placement": "default",
      "tick": {
        "size": 58,
        "placement": "cross"
      },
      "itemsOverlap": true,
      "item": {
        "offsetY": -55
      }
    },
    "tooltip": {
      "visible": false
    },
    "crosshair-x": {
      "line-width": "100%",
      "alpha": 0.18,
      "plot-label": {
        "header-text": "%kv use frequency"
      }
    },
    "series": [{
        "values": [Ad_num_Chrome, Ad_num_Safari, Ad_num_Firefox, Ad_num_Opera],
        "alpha": 0.95,
        "borderRadiusTopLeft": 7,
        "background-color": "#8993c7",
        "text": "Android",
      },
      {
        "values": [IOS_num_Chrome, IOS_num_Safari, IOS_num_Firefox, IOS_num_Opera],
        "borderRadiusTopLeft": 7,
        "alpha": 0.95,
        "background-color": "#fdb462",
        "text": "IOS"
      }
    ]
  }]
};
        zingchart.render({
            id: 'barChart',
            data: myConfig
        });
        //totalUser -= unavailableUser;
        //var computerUser = totalUser - mobileUser;
        let dataObj3 = {
            type: 'pie',
            legend: {
                draggable: true,
            },
            title: {text: 'Ratio of Mobile Users VS Computer Users'},
            series: [
                //[parseFloat(mobileUser).toFixed(2)+"%"]
                {values: [mobileUser],
                 text: 'Mobile Users'},
                {values: [computerUser],
                 text: 'Computer Users',
                 'detached': true}
            ]
        }
        zingchart.render({
            id: 'pieChart',
            data: dataObj3
        });
        var mobileSpeed = data.mobileSpeed;
        var mobileID = data.mobileID;
        //get fp, fid according to mobileID
        var url1 = 'https://cspears.site/api/fp/';
        var url2 = 'https://cspears.site/api/fid/';
        var dataFp = [], dataFid = [], speedAvg = 0, fpAvg = 0, fidAvg = 0;
        for (var i = 0; i < mobileID.length; i++){
            dataFp.push(JSON.parse(get_data_from_url(url1+mobileID[i].toString()))); 
            dataFp[i] = parseFloat((dataFp[i].data).replace('\"', ''));
            dataFid.push(JSON.parse(get_data_from_url(url2+mobileID[i].toString())));
            dataFid[i] = parseFloat((dataFid[i].data).replace('\"', ''));
            mobileSpeed[i] = parseFloat(mobileSpeed[i]);
            speedAvg += mobileSpeed[i], fpAvg += dataFp[i], fidAvg += dataFid[i];
            //average[i] = Number((average[i]).toFixed(2)); 
        }
        speedAvg /= mobileSpeed.length, fpAvg /= dataFp.length, fidAvg /= dataFid.length;
        speedAvg = Number(speedAvg.toFixed(2)), fpAvg = Number(fpAvg.toFixed(2)), fidAvg = Number(fidAvg.toFixed(2)); 
        const zgRef = document.querySelector('zing-grid');
        var zgData = [];
        for (var i in dataFid){
            zgData.push({
                "id": mobileID[i].toString(),
                "internetSpeed (mb)": mobileSpeed[i].toString(),
                "firstPaint (second)": dataFp[i].toString(),
                "firstInputDelay (second)": dataFid[i].toString()
            })
        }
        zgData.push({
                "id": 'Avg',
                "internetSpeed (mb)": 'Avg: ' + speedAvg,
                "firstPaint (second)": 'Avg: ' + fpAvg,
                "firstInputDelay (second)": 'Avg: ' + fidAvg
        });
        // target grid and assign data directly
        zgRef.setData(zgData);

        // function used to get json data from url

    })
    });
    </script>
    </body>
    <footer>

    </footer>
</html>
