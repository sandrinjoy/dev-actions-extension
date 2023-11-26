import { BACKGROUND_TASKS } from "@src/utils/constants";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === BACKGROUND_TASKS.SORT_TABS) {
		chrome.tabs.query({ currentWindow: true }, (tabs) => {
			const sortedTabs = tabs.sort((a, b) => {
				// const aTitle = a?.title ?? '';
				// const bTitle = b?.title ?? '';
				// return aTitle.localeCompare(bTitle);
				const aUrl = a?.url ?? "";
				const bUrl = b?.url ?? "";
				return aUrl.localeCompare(bUrl);
			});
			sortedTabs.forEach(async (tab, index) => {
				const tabId = tab?.id ?? 0;
				await chrome.tabs.move(tabId, { index });
			});

			sendResponse({ message: "success" });
		});
	}
});
