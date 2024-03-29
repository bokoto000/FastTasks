function solution(){
let  n = document.getElementById("n").value;
let m = document.getElementById("m").value;

var data =document.getElementById("data").value;
  console.log(data);
  data=data.split(" ");
  var mat = [];
  for(i = 0 ;i < data.length;i+=3){
      if(data[i]!=""&&data[i+1]!=""&&data[i+1]!="")
      {
          mat.push({x:data[i],y:data[i+1],s:data[i+2]});
      } 
      else console.log("bad data");
  }


mat.sort(function(a, b) {
  if (a.s > b.s) return 1;
  else return -1;
});

let uniqueSpeeds = [];

function extractUniqueSpeeds(mat) {
  if (mat.length > 0) {
    speeds = [];
    speeds[0] = mat[0].s;
    uniqueSpeedsIndex = 0;
    for (let i = 1; i < mat.length; i++) {
      if (mat[i].s != speeds[uniqueSpeedsIndex]) {
        uniqueSpeedsIndex++;
        speeds[uniqueSpeedsIndex] = mat[i].s;
      }
    }
    return speeds;
  }
}

uniqueSpeeds = extractUniqueSpeeds(mat);

let list = [];
function transformMat(mat) {
  for (let i = 0; i < mat.length; i++) {
    x = mat[i].x;
    y = mat[i].y;
    s = mat[i].s;
    if (!list[x]) list[x] = [];
    if (!list[y]) list[y] = [];
    list[x].push({ v: y, s: s });
    list[y].push({ v: x, s: s });
  }
}
transformMat(mat);

flag = 0;
usedCount = 0;
used = [];
ans = [];

function dfs(list, x, minS, maxS) {
  usedCount++;

  if (usedCount == n) {
    flag = 1;
    ans.push({ minS, maxS });
    return;
  }
  if (flag == 1) return;
  for (let i = 0; i < list[x].length; i++) {
    entry = list[x][i];

    if (minS <= entry.s && maxS >= entry.s && used[entry.v] != 1) {
      used[entry.v] = 1;

      dfs(list, entry.v, minS, maxS);
    }
  }
}

speedsLen = speeds.length - 1;
function binarySearch(speeds, left, right, minS) {
  if (left > right || left > speedsLen || right > speedsLen) return;
  middle = parseInt((left + right) / 2);
  maxS = speeds[middle];

  flag = 0;
  usedCount = 0;
  used = [];
  used[1] = 1;
  dfs(list, mat[0].x, minS, maxS);
  if (left == right) return;
  if (flag == 1) {
    return binarySearch(speeds, left, middle, minS);
  } else {
    return binarySearch(speeds, middle + 1, right, minS);
  }
}

for (let i = 0; i <= speedsLen; i++) {
  minS = speeds[i];
  binarySearch(speeds, i, speedsLen, minS);
}

ans.sort(function(a, b) {
  if (a.maxS - a.minS > b.maxS - b.minS) return 1;
  if (a.maxS - a.minS < b.maxS - b.minS) return -1;
  if (a.minS < b.minS) return -1;
  if (a.minS > b.minS) return 1;
  if (a.maxS > b.maxS) return -1;
  if (a.maxS < b.maxS) return 1;
});

console.log(ans[0].minS + " " + ans[0].maxS);
}