using System;

/*


let n be an int
 for every int less than n 
 print fizz if  i/3 and i/5
 print fizz if i/3
 print buzz if i/5
 else print i

*/


//internal access mod limits to class and its members but not static member
// protected is available for a class and its children
//public and private the same as java
//static also the same as java
//public static void FizzBuzz(int number){
    int counter = 1;
    int number = 20

    while(counter <= number){
        if(counter % 3 == 0 && counter % 5 == 0){
            Console.WriteLine("FizzBuzz");
        }
        else if(counter % 3 == 0){
            Console.WriteLine("Fizz");
        }
        else if(counter % 5 == 0){
            Console.WriteLine("Buzz");
        }
        else{
            Console.WriteLine(counter);
        }
        counter++;
    }



