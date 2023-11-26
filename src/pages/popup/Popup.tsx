import React from "react";
import logo from "@assets/img/logo.svg";
import { BACKGROUND_TASKS } from "@src/utils/constants";
import { RiRestartLine } from "react-icons/ri";
import { GiStack } from "react-icons/gi";

export default function Popup(): JSX.Element {
	function handleRestartChrome() {
		// this will simply load chrome://restart in a new tab
		chrome.tabs
			.create({ url: "chrome://restart", active: true })
			.then((tab) => {
				console.log("tab", tab);
			})
			.catch((err) => {
				console.log("err", err);
			});
	}

	function handleSortTabs() {
		// this will send a message to the background script
		chrome.runtime.sendMessage(
			{ type: BACKGROUND_TASKS.SORT_TABS },
			(response) => {
				console.log("response", response);
			}
		);
	}
	return (
		<div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
			<div className="flex gap-4 jsutify-center items-center">
				<div className="flex flex-col items-center justify-center aspect-square gap-1 h-16 text-white font-bold">
					<button
						onClick={handleRestartChrome}
						className="rounded-full bg-red-400 aspect-square h-10 flex items-center justify-center"
					>
						<RiRestartLine className=" h-4 w-4" />
					</button>
					Restart Chrome
				</div>
				<div className="flex flex-col items-center justify-center aspect-square gap-1 h-16 text-white font-bold">
					<button
						onClick={handleSortTabs}
						className="rounded-full bg-red-400 aspect-square h-10 flex items-center justify-center"
					>
						<GiStack className=" h-4 w-4" />
					</button>
					Sort
				</div>
			</div>
		</div>
	);
}
