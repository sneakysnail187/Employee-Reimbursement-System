namespace ExpenseTracker;

class Program
{
    static void Main(string[] args)
    {
        Greeting();

        DisplayOptions();
        int selectedOption = getUserOption();

        //execute according to selection

        switch(selectedOption){

            case 1:
                Console.WriteLine("User selected add an expense");
                break;
            case 2:
                Console.WriteLine("User selected view all expenses");
                break;
            case 3:
                Console.WriteLine("User selected edit an expense");
                break;   
            case 4:
                Console.WriteLine("User selected delete an expense");
                break;
            case 5:
                Console.WriteLine("Saving a file...");
                break;
            case 6:
                Console.WriteLine("Exiting");
                break; 
            default:
                Console.WriteLine("Invalid input, try again");
                break;
        }
    }

    public static void Greeting(){
        Console.WriteLine("Hello \n");
        Thread.Sleep(1500);
        Console.WriteLine("Select one of the following: \n");
        Thread.Sleep(1500);
    }

    public static void DisplayOptions(){
        Console.WriteLine("1. Add Expense");
        Console.WriteLine("2. View Expenses");
        Console.WriteLine("3. Edit Expense");
        Console.WriteLine("4. Delete Expense");
        Console.WriteLine("5. Save t0 a file");
        Console.WriteLine("6. Exit");
    }

    public static int getUserOption(){
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
