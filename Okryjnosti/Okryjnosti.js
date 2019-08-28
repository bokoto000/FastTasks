function solution() {
    console.log("Started Solution");
  var n = document.getElementById("id").value;
  console.log(n);
  var data =document.getElementById("data").value;
  console.log(data);
  data=data.split(" ");
  var okr = [];
  for(i = 0 ;i < data.length;i+=3){
      if(data[i]!=""&&data[i+1]!=""&&data[i+1]!="")
      {
          okr.push([data[i],data[i+1],data[i+2]]);
      } 
      else console.log("bad data");
  }


  var mat = [];

  for (i = 0; i < n; i++) {
    mat[i] = [];
  }

  function getDistance(x1, y1, x2, y2) {
    x = Math.abs(x1 - x2);
    y = Math.abs(y1 - y2);
    return Math.sqrt(x * x + y * y);
  }

  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      if (i != j) {
        //console.log(i + " " + j);
        distance = getDistance(okr[i][0], okr[i][1], okr[j][0], okr[j][1]);
        r1 = okr[i][2];
        r2 = okr[j][2];
        if (distance < r1 + r2) {
          //console.log(getDistance(okr[i][0], okr[i][1], okr[j][0], okr[j][1]));
          mat[i].push(j);
        }
      }
    }
  }
  used = [];
  queue = [];
  queue.push({ i: 0, dist: 1 });
  used[0] = 1;
  ans = 99999999;
  var found = false;
  for (; queue.length > 0; ) {
    obj = queue.shift();
    x = obj.i;
    console.log(obj);
    if (x == n - 1) {
      found = true;
      ans = Math.min(ans, dist);
      //break;
    }
    dist = obj.dist;
    if (mat[x])
      for (i = 0; i < mat[x].length; i++) {
        if (used[mat[x][i]] != 1) {
          queue.push({ i: mat[x][i], dist: dist + 1 });
          used[mat[x][i]] = 1;
        }
      }
  }

  if (found == false) {
    console.log("-1");
  }

  console.log(ans);
}
