<script>
	import '../app.css';
</script>

<!-- sidebar menu -->
<div class="grid grid-cols-[16rem_1fr]">
	<nav
		id="default-sidebar"
		class="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
		aria-label="Sidebar"
	>
		<div class="h-full px-6 py-12 overflow-y-auto bg-gray-700 dark:bg-gray-800">
			<!-- scr und alt schreiben -->

			<img
				class="w-10 h-10 rounded-full flex items-center p-2 text-gray-100 dark:text-white hover:bg-grey-950 dark:hover:bg-gray-700 group"
				scr=""
				alt="LOGO"
			/>

			<h2 class="p-2 mb-12 text-2xl font-bold text-gray-100 dark:text-white">LaKa Radstadt</h2>

			<ul class="space-y-2 font-medium">
				<li>
					<a
						href="#"
						class="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
					>
						<!-- Icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-folder-closed"
							><path
								d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
							/><path d="M2 10h20" /></svg
						>

						<span class="ms-3">Alle Kunden</span>
					</a>
				</li>
				<li>
					<a
						href="#"
						class="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-folder-clock"
							><circle cx="16" cy="16" r="6" /><path
								d="M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2"
							/><path d="M16 14v2l1 1" /></svg
						>
						<span class="flex-1 ms-3 whitespace-nowrap">Zuletzt verwendet</span>
					</a>
				</li>
				<li>
					<a
						href="#"
						class="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-folder-plus"
							><path d="M12 10v6" /><path d="M9 13h6" /><path
								d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
							/></svg
						>

						<span class="flex-1 ms-3 whitespace-nowrap">Neue anlegen</span>
						<span> </span>
					</a>
				</li>
				<br class="pb-4" />
				<hr class="pb-4" />
				<li>
					<a
						href="#"
						class="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-filter"
							><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg
						>
						<span class="flex-1 ms-3 whitespace-nowrap">Filtern</span>
					</a>
				</li>
			</ul>
		</div>
	</nav>

	<slot />
</div>
