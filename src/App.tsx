import './App.css'

import FileUpload from "@/components/file";
import React from "react";
import {Toaster} from "sonner";
import Index from "@/views/home";

function App() {
	return (
		<div className='App'>
			<Toaster position="top-center"/>
			<Index/>
		</div>
	)
}

export default App
