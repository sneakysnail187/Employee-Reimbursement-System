using System; //import namespaces and libraries here

namespace HelloC_;// package

// main class, program entry point
class Program
{

    //entry point of execution
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
        int age = 23;
        double quant = 23.7; // general use more accure
        float quant2 = 33.1f; // less precision/mem usage
        long beeg = 1231234342345435654; // larger than int  less than double
        short small = 12;
        byte b2 = 255;

        char meech = 'c';
        bool it = true;

        String me = "Yo";

        Console.WriteLine("Hello" + me);
        Console.WriteLine($"I am {age} years old");

        int a = 5 + 9;
        int b = 5 - 10;
        int c = 10*5;
        int d = 10/5;
        int e = 10%5;

        //a < b || a == b   OR
        // a<b ^ b ==a      XOR

        //get use input

        Console.WriteLine("Enter your name: \n");
        string user = Console.ReadLine();
        Console.WriteLine("You entered: " + user);

        bool isPass = true;
        if(isPass){
            Console.WriteLine("Access granted");
        }
        else{
            Console.WriteLine("Access denied");
        }

        //typer conversion

        //implicit
        int myInt = 50;
        double dVal = myInt; //no data loss

        //explicit
        double myDub = 50.6;
        int iVal = (int) myDub;


    }
}
