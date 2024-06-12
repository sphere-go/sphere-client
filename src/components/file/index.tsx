import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {toast} from "sonner";
import "./index.less"
import MessageUtil from "@/utils/MessageUtil";

function FileUpload() {
	const [file, setFile] = useState<File>(new File([""], "filename"));
	const [hash, setHash] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// 获取文件的哈希值，用于唯一标识这个文件
	const getFileHash = async (file: File) => {
		if (!file) {
			setError('未选择上传的文件');
			return;
		}

		const arrayBuffer = await file.arrayBuffer();
		const hashBuffer = await window.crypto.subtle.digest('SHA-256', arrayBuffer);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
		setHash(hashHex);
	}

	// 获取文件
	const getFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			setFile(files[0]);
			await getFileHash(files[0]);
			if (error !== null) {
				MessageUtil.error(error.toString())
			} else {
				await uploadFile()
				MessageUtil.success("上传成功")
			}
		}
	}

	// 查询本文件是否已经上传了

	// 上传文件
	const uploadFile = async () => {

		// 文件分片的大小
		const chunkSize = 5 * 1024 * 1024;
		// 文件块的大小
		const chunks = Math.ceil(file.size / chunkSize);
	}

	return (
		<>
			<div className="grid w-full max-w-56 items-center gap-1.5">
				<Input id="file" type="file" onChange={getFile}/>
			</div>
		</>
	);
}

export default FileUpload;
