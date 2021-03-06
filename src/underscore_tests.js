/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.

  _.first = function(array, n) {
    if (n) {
      return array.slice(0,n);
    } else {
      return array[0];
    }  
  };      
        
  // Like first, but for the last elements. If n is undefined, return just the
  // last element.

  _.last = function(array, n) {
    if (n && n <= array.length - 1) {
      return array.slice(array.length - n, array.length)
    } else if (n && n > array.length - 1) {
      return array;
    } else {
      return array[array.length - 1];
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.

  _.each = function(collection, iterator) {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.

  _.indexOf = function(array, target){
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.

  _.filter = function(collection, iterator) {
    var newArr = [];
    for (var i = 0; i < collection.length; i++) {
      if(iterator(collection[i]) === true) {
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Return all elements of an array that don't pass a truth test.

  _.reject = function(collection, iterator) {
    var newArr = [];
    for (var i = 0; i < collection.length; i++) {
      if(iterator(collection[i]) !== true) {
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Produce a duplicate-free version of the array.

  _.uniq = function(array) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      if (newArr.indexOf(array[i]) === -1) {
        newArr.push(array[i]);
      }
    }
    return newArr;
  };

  // Return the results of applying an iterator to each element.

  _.map = function(array, iterator) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      newArr.push(iterator(array[i]));
    }
    return newArr;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages

  _.pluck = function(array, propertyName) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      newArr.push(array[i][propertyName]);
    }
    return newArr;
  };

  // Calls the method named by methodName on each value in the list.

  _.invoke = function(list, methodName, args) {
    if (typeof methodName === 'string') {
      for (var i = 0; i < list.length; i++) {
        list[i][methodName]();
      }
      return list;
    } else if (typeof methodName === 'function') {
      for (var i = 0; i < list.length; i++) {
        methodName.call(list[i]);
      }
      return list;
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.

  _.reduce = function(collection, iterator, initialValue) {
    if (initialValue === undefined) {
      initialValue = 0;
    }
    for (var i = 0; i < collection.length; i++) {
      initialValue = iterator(initialValue, collection[i]);
    }
    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).

  _.contains = function(collection, target) {
    for (var key in collection) {
      if (collection[key] === target) {
        return true;
      }
    }
    return false;
  };

  // Determine whether all of the elements match a truth test.

  _.every = function(collection, iterator) {
    for (var i = 0; i < collection.length; i++) {
      if(iterator) {
        if(!iterator(collection[i])) {
          return false;
        }
      } else {
        if (!collection[i]) {
          return false;
        }
      }
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

  _.some = function(collection, iterator) {
    for (var i = 0; i < collection.length; i++) {
      if (iterator) {
        if (iterator(collection[i])) {
          return true;
        }
      } else {
        if (collection[i]) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).

  _.extend = function(obj) {
    var passedInObj = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < passedInObj.length; i++) {
      for (var key in passedInObj[i]) {
        obj[key] = passedInObj[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj

  _.defaults = function(obj) {
    var passedInObj = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < passedInObj.length; i++) {
      for (var key in passedInObj[i]) {
        var hasProperty = false;
        if (obj.hasOwnProperty(key)) {
          hasProperty = true;
        }
        if (hasProperty === false) {
          obj[key] = passedInObj[i][key];
        }
      }
    }
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.

  _.once = function(func) {
    var result = func();
    return function() {
      return result;
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func) {
    return function(param) {
      return func(param);
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms

  _.delay = function(func, wait) {
    var myArgs = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(null, myArgs);
    }, wait);
  };

  // Shuffle an array.

  _.shuffle = function(array) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      var random = Math.floor(Math.random() * array.length);
      newArr.push(array[random]);
      array.splice(random, 1);
    }
    return newArr;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.

  _.sortBy = function(collection, iterator) {
    var sortedArr = [];
    for (var key in collection) {
      var obj = collection[key];
      if (typeof iterator === 'string') {
        var objProp = obj[iterator];
        if (sortedArr.length === 0 || !objProp) {
          sortedArr.push(obj);
        } else {
          for (var i = 0; i < sortedArr.length; i++) {
            var current = sortedArr[i];
            var currentProp = current[iterator];
            var next = sortedArr[i + 1];
            if (!currentProp || currentProp > objProp) {
              sortedArr.splice(i, 0, obj);
              break;
            } else if (!next) {
              sortedArr.push(obj);
              break;
            } else {
              var nextProp = next[iterator];
              if (nextProp > objProp) {
              sortedArr.splice(i + 1, 0, obj);
              break;
              }
            }
          }
        }
      } else {
        var objProp = iterator(obj);
        if (sortedArr.length === 0 || ! objProp) {
          sortedArr.push(obj);
        } else {
          for (var i = 0; i < sortedArr.length; i++) {
            var current = sortedArr[i];
            var currentProp = iterator(current);
            var next = sortedArr[i + 1];
            if (! currentProp || currentProp > objProp) {
              sortedArr.splice(i, 0, obj);
              break;
            } else if (!next) {
              sortedArr.push(obj);
              break;
            } else {
              var nextProp = iterator(next);
              if (nextProp > objProp) {
                sortedArr.splice(i + 1, 0, obj);
                break;
              }
            }
          }
        }
      }
    }
    return sortedArr;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]

  _.zip = function() {
    var passedArgs = [];
    for (var i = 0; i < arguments.length; i++) {
      passedArgs.push(arguments[i])
    }
    var result = [];
    var largestLength = 0;

    //Get largest length
    passedArgs.forEach(function (passedArr, index) {
      if (passedArr.length > largestLength) {
        largestLength = passedArr.length;
      }
    })

    //For each location in largestLength
    for (var i = 0; i < largestLength; i++) {
      //This array is created for each count in largestLength (and is contained within the loop)
      var iArr = [];

      //This repeats the push for as many arguments that were passed
      for (var j = 0; j < passedArgs.length; j++) {
        iArr.push(passedArgs[j][i])
      }
      result.push(iArr);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.

  _.flatten = function(nestedArray, result) {
    var result = [];
    var checkForArr = function(item) {
      if (item.constructor === Array) {
        return true;
      } else {
        return false;
      }
    }

    var cleanArr = function(array) {
      array.forEach(function(item) {
        var isArray = checkForArr(item);
        if (isArray) {
          cleanArr(item);
        } else {
          result.push(item);
        }
      })
    }
    cleanArr(nestedArray);
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.

  _.intersection = function(arrayOne, arrayTwo) {
    var result = [];
    arrayOne.forEach(function(item) {
      var indexInTwo = arrayTwo.indexOf(item);
      if (indexInTwo > -1) {
        result.push(item);
      }
    })
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.

  _.difference = function(array) {
    var passedArgs = [];
    for (var i = 0; i < arguments.length; i++) {
      passedArgs.push(arguments[i])
    }
    passedArgs.shift();

    passedArgs.forEach(function (argument) {
      argument.forEach(function (number) {
        var numIndex = array.indexOf(number);
        if (numIndex > -1) {
          array.splice(numIndex, 1);
        }
      })
    })
    return array;
  };

}).call(this);
