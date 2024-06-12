import {toast} from "sonner";

export default class MessageUtil {
	static success(content: string) {
		toast.success(content)
	}

	static error(content: string) {
		toast.error(content)
	}
}
