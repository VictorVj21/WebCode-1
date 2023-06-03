//creating DOM

document.body.innerHTML =`
    <div class="container-fixed">
    <h1> NATIONALISE API</h1><br>
    <div class="row">
        <div class="col-8">
        <form class="form-group">
            <input type="text" id="searchtext" placeholder="enter name to be searched"
            class="form-control p-3">
        </form>
        </div>
        <span class="col-4">
        <input type="button" value="Search" id="btn" class="btn btn-primary ">
        <input type="button" value="Reset" id="resetbtn" class="btn btn-danger">
        </span>
    </div>
    <br />

    <div class=" container-fluid result">
    <h4> Top two countries for the nationality based on name and their probability are:</h4><br>
    <h4 id=result></h4><br><br>
    </div>`

let Searchtext=document.querySelector("#searchtext");
let Resultdata=document.querySelector("#result");
let Searchbutt=document.querySelector("#btn");
let Resetbutt=document.querySelector("#resetbtn");

Searchbutt.addEventListener("click", async ()=>{
    let value=document.getElementById("searchtext").value;
    document.querySelector('.result').style.display="block"
    
//if given value is zero or empty then it will display the alert
    if(value.length==0||value.includes(" ")){
         alert("Please enter the valid name without any spaces");

    }
    //fetch the data from url
    else {
      
        try{
           let data=await fetch(`https://api.nationalize.io/?name=${value}`);
           let result= await data.json();
           console.log(result);
            Resultdata.innerHTML = "";
            
            let countries = 2;
           
           for(let i=0;i<countries;i++){
           Resultdata.innerHTML+=
             `
             <div class="container">
               <div class="card">
                 <div class="card-header">
                 <div class="card-body">

                 Country_id:${result.country[i].country_id}<br>
                 Probability:${result.country[i].probability}<br><br>
                    </div>
                 </div>
               </div>
             </div>
               `
           }
           
        }
        catch{
            console.log(error);
        }
        
    }
});

var container_data = document.querySelector('.card');
Resetbutt.addEventListener("click",()=>{
document.querySelector('.result').style.display="none";
Searchtext.value=" ";
Resultdata.innerHTML=" ";

});