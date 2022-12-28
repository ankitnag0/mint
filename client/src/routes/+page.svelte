<script>
	let server = import.meta.env.VITE_SERVER_ADDRESS;
</script>

<div class="mx-auto lg:w-1/2 w-full">
	<template>
		<div class="py-12">
			<div class="container mx-auto px-4 ">
				<div class="pl-12">
					<h1 class="text-4xl font-bold mb-4">Invest in your future with Mint</h1>
					<p class="text-xl mb-4">
						Our micro investment platform makes it easy for you to start building your financial
						future today.
					</p>
					<p class="text-lg mb-8">
						With low minimum investments and a user-friendly interface, it's never been easier to
						get started. {server}
					</p>
					<a href="/signup" class="btn btn-primary">Get started</a>
					<a href="/login" class="btn btn-accent">Log in</a>
				</div>
			</div>
		</div>
	</template>
</div>
