/*const n = 3;
let data = `B Y 0 0 P 0 0 0 0
L 0 0 R E B 0 0 0 
0 E W 0 0 0 0 L 0 
W 0 0 0 L 0 0 0 Y
G 0 0 W 0 Y 0 0 R 
P 0 0 0 O 0 0 0 L
0 L 0 0 0 0 O W 0
0 0 0 G R E 0 0 B 
0 0 0 0 W 0 0 P E`
*/

const n = 2;
let data = `
0 0 # $
0 0 0 0
* 0 0 0
0 # 0 5`;
data = data.split(" ");
for (var i = 0; i < data.length; ) {
  if (data[i] == "") {
    data.splice(i, 1);
  }
  if (data[i] != "") i++;
}
console.log(data);
