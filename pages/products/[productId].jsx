import BackButton from "../../components/BackButton";
import LoginHeader from "../../components/LoginHeader";
import React, { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import Image from "next/image";
import { Button } from "baseui/button";
import { GrCart } from "react-icons/gr";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { useSession, signIn } from "next-auth/react";
import { makeSerializable } from "../../lib/util";

function productId({ product }) {
	const session = useSession();
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [load1, setLoad1] = useState(false);
	const [load2, setLoad2] = useState(false);

	const openImageViewer = useCallback((index) => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	const buyHandler = async () => {
		// payment related
		if (session.data) {
			setLoad1(true);
			console.log(product.id);
			setLoad1(false);
		}
	};

	const cartHandler = async () => {
		// handle add to cart
		const res = await fetch("/api/cart", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: product.id,
				quantity: 1,
			}),
		});

		if (!res.ok) {
			console.error("Error adding to cart");
		} else {
			const cart = res.json();
			console.log(cart);
		}

		if (session.product) {
			setLoad2(true);
			setLoad2(false);
		} else signIn();
	};

	return (
		<>
			<BackButton />
			<LoginHeader />

			<div>
				{product && (
					<div className="grid md:grid-cols-2">
						<div className="flex justify-center flex-wrap gap-2  animate__animated animate__fadeInUp">
							{product.image.map(
								(src, index) =>
									src &&
									index === 0 && (
										<Image
											src={src}
											className="object-contain"
											onClick={() => openImageViewer(index)}
											width="550"
											height="100"
											key={index}
											quality={100}
											placeholder="blur"
											blurDataURL="blur"
											alt={product.name}
										/>
									)
							)}

							{isViewerOpen && (
								<ImageViewer
									src={product.image.filter((el) => el !== undefined)}
									currentIndex={currentImage}
									disableScroll={false}
									closeOnClickOutside={true}
									onClose={closeImageViewer}
								/>
							)}
						</div>
						<div className="md:w-3/4 mx-auto md:py-20">
							<h1 className="text-2xl text-left">{product.name}</h1>
							{product.category && (
								<>
									<p className="font-light text-left cursor-default">
										{product.category.map((item) => item.name).join(", ")}
									</p>
									{/* <br /> */}
								</>
							)}
							<p className="font-medium text-left mt-2">
								{product.description}
							</p>
							{/* <p className="flex justify-start items-center mt-4">
								<Star />
								{product.rating.rate}
							</p> */}
							{/* <p className="text-left mt-2">{product.rating.count} reviews</p> */}
							<h2 className="font-bold text-xl text-left mt-2">
								${product.price}
							</h2>
							<div className="flex justify-start">
								<button
									className="mt-4 bg-gray-800 hover:bg-gray-700 rounded-md text-slate-200 p-4"
									// onClick={handleClick}
								>
									{/* {added ? "Added to cart" : "Add to cart"} */}
									Add to cart
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
			{/* <h2 className="select-none my-[.5rem] py-[.5rem] text-3xl cursor-default text-center">
				{product.name}
			</h2>
			<div className="my-2 py-2 ml-5 pl-5 flex justify-center flex-wrap gap-2 grid-cols-2 animate__animated animate__fadeInUp">
				{product.image.map(
					(src, index) =>
						src && (
							<Image
								src={src}
								onClick={() => openImageViewer(index)}
								width="400"
								height="200"
								key={index}
								quality={100}
								placeholder="blur"
								blurDataURL="blur"
								alt={product.name}
							/>
						)
				)}

				{isViewerOpen && (
					<ImageViewer
						src={product.image.filter((el) => el !== undefined)}
						currentIndex={currentImage}
						disableScroll={false}
						closeOnClickOutside={true}
						onClose={closeImageViewer}
					/>
				)}
			</div>

			{product.description && (
				<>
					<p className="mx-10 cursor-default break-all select-none text-center animate__animated animate__fadeInUp">
						<span className="text-xl cursor-default select-none">
							Description:
						</span>{" "}
						<br />
						{product.description}
					</p>
					<br />
				</>
			)}
			<div className="flex gap-2 flex-wrap mb-2 pb-5 justify-center animate__animated animate__fadeInUp">
				{product.price && (
					<>
						<p className="mx-10 cursor-default select-none">
							<span className="text-xl cursor-default select-none">Price:</span>{" "}
							<br /> ₹{product.price}
						</p>
						<br />
					</>
				)}
				{product.category && (
					<>
						<p className="mx-10 cursor-default select-none">
							<span className="text-xl cursor-default select-none">
								Category:
							</span>{" "}
							<br />
							{product.category.map((item) => item.name).join(", ")}
						</p>
						<br />
					</>
				)}
				{product.startup.name && (
					<>
						<p className="mx-10 cursor-default select-none">
							<span className="text-xl cursor-default select-none">
								Startup:
							</span>{" "}
							<br />
							{product.startup.name}
						</p>
						<br />
					</>
				)}
			</div>

			<div className="flex justify-center gap-5 mb-[3rem] pb-[3rem] md:mb-[1rem] md:pb-[1rem]">
				<Button
					onClick={buyHandler}
					isLoading={load1}
					overrides={{
						BaseButton: {
							style: ({ $theme }) => ({
								backgroundColor: $theme.colors.accent500,
							}),
						},
					}}
					startEnhancer={
						<BsFillCreditCard2BackFill style={{ fontSize: "1.5rem" }} />
					}
				>
					Buy Now
				</Button>
				<Button
					onClick={cartHandler}
					isLoading={load2}
					overrides={{
						BaseButton: {
							style: ({ $theme }) => ({
								backgroundColor: $theme.colors.positive400,
							}),
						},
					}}
					startEnhancer={<GrCart style={{ fontSize: "1.5rem" }} />}
				>
					Add To Cart
				</Button>
			</div> */}
		</>
	);
}

export async function getServerSideProps(context) {
	const { productId } = context.query;
	const res = await fetch(
		`${process.env.NEXT_APP_URL}/api/products/${productId}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: context.req.headers.cookie,
			},
		}
	);
	const product = await res.json();
	return {
		props: {
			product: makeSerializable(product),
		},
	};
}

export default productId;
