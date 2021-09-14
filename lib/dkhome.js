exports.home= function(req, res){
    var html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Main Page</title>
        </head>
        <body>
          <p><a href="/topic/board">Bulletin Board</a></p>  
          <br> 
          <p>User Scripts</p>
           <li><a href="/zabbixtool">ZabbixTool</a></li>
           <li><a href="#">BSTool</a></li>
          <p>Game</p>
           <li><a href="/canvas">Canvas</li> 
           <li><a href="/jumpgame">Jumpgame</li>
           <li><a href="/towerdefense">towerdefense</li>
        </body>
        </html>
    `;
    res.send(html);
}
