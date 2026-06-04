import Link from "next/link";                                               
                                                                               
   export default function NotFound() {                                        
     return (                                                                  
       <main className="container py-24 text-center">                          
         <h1 className="text-4xl font-bold mb-4">Page not found</h1>           
         <p className="text-muted-foreground mb-8">                            
           Sorry, the page you are looking for does not exist.                 
         </p>                                                                  
         <Link href="/" className="underline">                                 
           Back to home                                                        
         </Link>                                                               
       </main>                                                                 
     );                                                                        
   }           