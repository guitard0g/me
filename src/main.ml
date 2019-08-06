type person = {
  name: string;
  age: int;
}

let json_of_person { name ; age } =
  let open Ezjsonm in
  dict [ "name", (string name)
       ; "age", (int age) ]

let print_param = 
  let open Opium.Std in 
  get "/hello/:name" begin fun req ->
    `String ("Hello " ^ param req "name") |> respond'
  end

let print_person = 
  let open Opium.Std in 
  get "/person/:name/:age" begin fun req ->
    let person = {
      name = param req "name";
      age = "age" |> param req |> int_of_string;
    } in
    `Json (person |> json_of_person) |> respond'
  end

let index_redirect = 
  let open Opium.Std in 
  get "/" begin fun _ ->
    redirect' (Uri.of_string "/index.html")
  end 

let static_html = 
  let open Opium.Std in 
  Middleware.static ~local_path:"./frontend/_build/default" ~uri_prefix:"/" ()

let _ =
  let open Opium.Std in 
  App.empty
  |> print_param
  |> print_person
  |> index_redirect
  |> middleware static_html
  |> App.run_command
