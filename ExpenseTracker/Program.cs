namespace ExpenseTracker;

class Program
{
    static void Main(string[] args)
    {
        Greeting();
    }

    public static void Greeting(){
        Console.WriteLine("Hello");
        Thread.sleep(1500);
        Console.WriteLine("Select one of the following: \n");
        Thread.sleep(1500);

        DisplayOptions();
        getUserOption();

    }

    public static void DisplayOptions(){
        Console.WriteLine("1. Add Expense");
        Console.WriteLine("2. View Expenses");
        Console.WriteLine("3. Edit Expense");
        Console.WriteLine("4. Delete Expense");
        Console.WriteLine("5. Save t0 a file");
        Console.WriteLine("6. Exit");
    }

    public int getUserOption(){
        Console.WriteLine("Select the option: \n");
        string? userInput = Console.ReadLine();

        try{
            return Int32.Parse(userInput);
        }
        catch(FormatException e){
            Console.WriteLine("Invalid input! Type a number");
            return getUserOption();
        }


    }
}
