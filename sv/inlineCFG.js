function processInlineCFGs(html){

}

function processText(params){
  switch(params.type){
    case "data":
      //Process data
      let path = params.src.substring(params.src.indexOf("."));
      if(params.data[path]){
        
      }else if(params.data.all){

      }
      break;
    case "content":
      //Process content and if needs to go to header
      if(params.src){
        //Pass content as content and run
      }
      break;
    case "template":
      //Insert param content into page
      break;
    case "fragment":
      //Get content page and insert
      break;
  }
}
