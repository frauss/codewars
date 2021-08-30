snail = function (array) {
  let returnValues = [];
  let rows = array.length;
  if (rows > 0) {
    let columns = array[0].length;
    if (columns > 0) {
      let top = 0;
      let bottom = rows - 1;
      let left = 0;
      let right = columns - 1;
      let direction = 0;
      while (top <= bottom && left <= right) {
        // Move right
        if (direction === 0) {
          for (let column = left; column <= right; column++) {
            returnValues.push(array[top][column]);
          }
          top++;
          direction = 1;
        }

        // Move down
        else if (direction === 1) {
          for (let row = top; row <= bottom; row++) {
            returnValues.push(array[row][right]);
          }
          right--;
          direction = 2;
        }

        // Move left
        else if (direction === 2) {
          for (let column = right; column >= left; column--) {
            returnValues.push(array[bottom][column]);
          }
          bottom--;
          direction = 3;
        }

        // Move up
        else if (direction === 3) {
          for (let row = bottom; row >= top; row--) {
            returnValues.push(array[row][left]);
          }
          left++;
          direction = 0;
        }
      }
    }
  }
  return returnValues;
};

module.exports = {
    "snail": snail
};