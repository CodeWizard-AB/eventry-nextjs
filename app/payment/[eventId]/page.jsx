import PaymentForm from "@/components/payment/PaymentForm";

export default async function Payment({ params }) {
	const { eventId } = await params;
	return (
		<section className="container">
			<div className="bg-[#242526] p-6 rounded-lg max-w-xl mx-auto">
				<h2 className="font-bold text-xl mb-8">Payment Details</h2>
				<PaymentForm eventId={eventId} />
			</div>
		</section>
	);
}
