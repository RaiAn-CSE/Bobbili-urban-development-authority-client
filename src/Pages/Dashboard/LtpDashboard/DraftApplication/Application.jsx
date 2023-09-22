import React, { useEffect } from 'react';
import ApplicationHeader from '../../../Shared/ApplicationHeader';

function Application({ setOpenApplication }) {
	const Part01 = {
		column: { "col2": ["NAME", "DOOR No. / FLAT No.", "ROAD/STREET", "VILLAGE|MANDAL", "CITY/TOWN", "DISTRICT", "E-MAIL", ["MOBILE", "ALTERNATE"]] }
	}
	const Part02 = ["PLOT NOs", "SANCTIONED LAYOUT NO. / LRS NO", ["SURVEY NO.", "VILLAGE"], "PREMISES / DOOR No.", "ROAD/ STREET", ["WARD NO.", "BLOCK No"], "LOCALITY", ["CIRCLE/DIVISION", "DIVISION"], ["CITY/TOWN", "DISTRICT"]];
	const Part03 = ["SITE AREA (IN SQ.M)", "NO. OF FLOORS", "FLOOR AREA (IN SQ.M)", "PARKING FLOOR AREA (IN SQ.M)", "USE OF THE BUILDING"];
	const Part04 = ["BUILDER / DEVELOPER/ CONSTRUCTION FIRM", "ARCHITECT", "ENGINEER", "STRUCTURAL ENGINEER", "SUPERVISOR/SURVEYOR", "TOWN PLANNER"]

	const PhoneTD = ["d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d"]

	const part02SubArray = [2, 5, 7, 8]

	useEffect(() => {
		// Opening the modal when the component mounts
		const modal = document.getElementById('my_modal_5');
		if (modal) {
			modal.showModal();
		}
	}, []);

	return (
		<div className='w-full h-full text-black'>
			<dialog id="my_modal_5" className="modal">
				<div className="modal-box w-11/12 max-w-5xl p-14">
					{/* Header */}
					<ApplicationHeader />
					<div>
						{/* Part01 */}
						<div className="overflow-x-auto table-sm">
							<table className="table bg-white">
								{/*Part01 head */}
								<thead>
									<tr>
										<th className='bg-blue-300 border border-black fontbold text-black'>A</th>
										<th className='bg-blue-300 border-l border-t border-black fontbold text-black'>ADDRESS OF THE APPLICANT</th>
										<th className='bg-blue-300 border-r border-t border-black fontbold text-black'></th>
									</tr>
								</thead>
								<tbody>
									{/* row 1 */}
									{Part01.column.col2.map((data, index) => (
										<>
											<tr key={index} className='bg-white'>
												{/* col-01 */}
												<th className='bg-white border border-black w-14'>{index + 1}</th>
												{/* col-02 */}
												<td className='bg-white border border-black w-64 p-0'>
													{index == 7 ?
														<p className='flex items-center justify-between py-0 pl-2'>
															{/* sub col */}
															<p className='w-1/2'>PHONE</p>

															<p className='flex flex-col border-black'>
																{data.map((d, i) => <p className={`border-l py-1 border-black px-2 ${i == 0 && "border-b"}`}>{d}</p>)}
															</p>

														</p> : 
														<p className='py-4 px-2'>{data}</p>}
												</td>

												{/* col-03 */}
												<td className='bg-white border border-black p-0'>{
													index == 7 ?
														<p className='flex '>
															{PhoneTD.map((d, i) =>
																<p className={`w-full border-black py-5 border-r px-2 ${i == 11 && "border-r-0"}`}>{i + 1}</p>)}
														</p>
														:
														<p className='py-4 px-2'>{index+1}</p>}
												</td>
											</tr >
										</>
									))}
								</tbody>
							</table>
						</div>
						{/* Part02 */}
						<div className="overflow-x-auto mt-10 text-black">
							<table className="table bg-white table-sm">
								{/*Part02 head */}
								<thead>
									<tr>
										<th className='bg-blue-300 border border-black fontbold text-black'>B</th>
										<th className='bg-blue-300 border-l border-t border-black text-black'>LOCATION OF THE PROPOSED SITE</th>
										<th className='bg-blue-300 border-r border-t border-black'></th>
									</tr>
								</thead>
								<tbody>
									{/* row 1 */}
									{Part02.map((data, index) => (
										<>
											<tr key={index} className='bg-white'>
												{/* col-01 */}
												<th className='bg-white border border-black w-14'>{index + 1}</th>
												{/* col-02 */}
												<td className='bg-white border border-black w-64 p-0'>{
													part02SubArray.includes(index) ?
														<p className='flex '>
															{data.map((d, i) =>
																<p className={`border-black py-4 px-2 ${i == 0 && "w-1/2 border-r"}`}>{d}</p>)}
														</p>
														:
														<p className='py-4 px-2'>{data}</p>}
												</td>
												{/* col-03 */}
												<td className='bg-white border border-black p-0'>{
													part02SubArray.includes(index) ?
														<p className='flex '>
															{data.map((d, i) =>
																<p className={`border-black py-4 px-2 ${i == 0 && "w-1/2 border-r"}`}>{i + 1}</p>)}
														</p>
														:
														<p className='py-4 px-2'></p>}
												</td>
											</tr>
										</>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Part 03 */}
					<div className="overflow-x-auto mt-10">
						<table className="table bg-white table-sm">
							{/*Part03 head */}
							<thead>
								<tr>
									<th className='bg-blue-300 border border-black fontbold text-black'>C</th>
									<th className='bg-blue-300 border-l border-t border-black fontbold text-black'>DETAILS OF THE PROPOSED CONSTRUCTION</th>
									<th className='bg-blue-300 border-r border-t border-black fontbold text-black'></th>
								</tr>
							</thead>
							<tbody>
								{/* row 1 */}
								{Part03.map((data, index) => (
									<>
										<tr key={index} className='bg-white'>
											<th className='bg-white border border-black w-14'>{index + 1}</th>
											<td className='bg-white border border-black w-64 p-4'>{data}</td>
											<td className='bg-white border border-black'></td>
										</tr>
									</>
								))}
							</tbody>
						</table>
					</div>
					{/* Part04 */}
					<div className="overflow-x-auto mt-10">
						<table className="table bg-white table-sm">
							{/*Part04 head */}
							<thead>
								<tr>
									<th className='bg-blue-300 border border-black fontbold text-black'>D</th>

									<th className='bg-blue-300 border-l border-t border-black fontbold text-black'>DETAILS OF THE LICENSED TECHNICAL PERSONNEL:</th>
									<th className='bg-blue-300 border-t border-black fontbold text-black'></th>
									<th className='bg-blue-300 border-r border-t border-black fontbold text-black'></th>
								</tr>
								<tr>
									<th className='bg-white border border-black fontbold text-black'>SL.NO</th>
									<th className='bg-white border border-black fontbold text-black'>NAME</th>
									<th className='bg-white border border-black fontbold text-black'>ADDRESS</th>
									<th className='bg-white border border-black fontbold text-black'>LICENSE NO.</th>
								</tr>
							</thead>
							<tbody>
								{/* row 1 */}

								{Part04.map((data, index) => (
									<>

										<tr key={index} className='bg-white'>
											<th className='bg-white border border-black w-14'>{index + 1}</th>
											<td className='bg-white border border-black w-64 pb-0 pt-6'><p>…………………………………</p><p>{data}</p></td>
											<td className='bg-white border border-black'></td>
											<td className='bg-white border border-black'></td>
										</tr>
									</>
								))}
							</tbody>
						</table>
					</div>
					<form method="dialog">
						<button onClick={() => setOpenApplication(false)} className="btn mt-5 text-right">Close</button>
					</form>
				</div>

			</dialog >
		</div >
	)
}

export default Application;
