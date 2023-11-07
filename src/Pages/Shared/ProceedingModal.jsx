import React from 'react';
import customScroll from "../../Style/Scrollbar.module.css";

const ProceedingModal = () => {

    return (
        <div className='dark:bg-white'>
            <dialog id="proceedingModal" className="modal">
                {/* divide-y-2 divide-gray-200 */}
                <div className={`${customScroll.customScrolling} rounded-lg modal-box py-10 bg-white text-gray-900  mb-10 w-11/12 max-w-5xl relative`}>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm text-white hover:bg-violet-600 btn-circle btn-ghost absolute top-2 right-2 bg-violet-500">✕</button>
                    </form>
                    <div>
                        <p>_____mandal______మండలం, ____gramap._______ గ్రామ పంచాయతి కార్యదర్శి వారి ఉత్తర్వులు ప్రస్తుతము శ్రీ _________ownerN.__________</p>
                        <h1 className='font-bold text-xl underline text-center mt-5'>భవన నిర్మాణ ఉత్తర్వులు </h1>
                        <p className='font-semibold text-sm'>వరకు,</p>
                        <div className='flex mt-5'>
                            <div className='basis-[40%]  mr-5'>
                                <table className='min-w-full border border-gray-900 h-20'>
                                    <td className='p-2'>
                                        భవన యజమాని వివరములు owner address
                                    </td>
                                </table>
                            </div>
                            <div className='basis-[60%]'>
                                <table className='min-w-full border border-gray-900 h-20'>
                                    <thead>
                                        <tr>
                                            <th className='p-2 border-r border-neutral-500 text-center'>
                                                బి. ఎ.నెం.
                                            </th>
                                            <th colSpan={8} className='p-2 text-center'>
                                                App. no
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='border-t border-neutral-500'>
                                            <th className='border-r p-2 border-neutral-500 text-base text-center'>
                                                తేది(approved date)
                                            </th>
                                            <td className='border-r p-2 border-neutral-500 text-base text-center'>
                                                ది
                                            </td>
                                            <td className='border-r p-2 border-neutral-500 text-base text-center'>
                                                ది
                                            </td>
                                            <td className='border-r p-2 border-neutral-500 text-base text-center'>
                                                మా
                                            </td>
                                            <td className='border-r p-2 border-neutral-500 text-base text-center'>
                                                మా
                                            </td>
                                            <td className='border-r p-2 border-neutral-500 text-base text-center'>
                                                సం
                                            </td>
                                            <td className='border-r p-2 border-neutral-500 text-base text-center'>
                                                సం
                                            </td>
                                            <td className='border-r p-2 border-neutral-500 text-base text-center'>
                                                సం
                                            </td>
                                            <td className='border-r p-2 border-neutral-500 text-base text-center'>
                                                సం
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <p className='mt-5'>విషయము : భవన అనుమతులు  - వ్యక్తిగత నివాస భవన నిర్మాణము  -  అనుమతులు  - ఇచ్చుట - గురించి.</p>
                    <p className='mt-5'>
                        సూచిక :
                        <ol className='px-5'>
                            <li>1. జి. ఓ. యం. ఎస్. నెం. 61, తేది. 12.02.2019 పురపాలక మరియు పట్టణాభివృద్ధి శాఖ, ఆంధ్రప్రదేశ్ వారి ఉత్తర్వులు.</li>
                            <li>2. ఆర్. ఓ. సి. నెం.</li>
                            <li>3. జి. ఓ. యం. ఎస్. నెం. 119, తేది. 10.07.2017 పురపాలక మరియు పట్టణాభివృద్ధి శాఖ, ఆంధ్రప్రదేశ్ వారి ఉత్తర్వులు.</li>
                            <li>4. దరఖాస్తు చేసుకొనిన తేది: ………digital sign date………….</li>
                        </ol>
                    </p>
                    <p className='mt-3'>ఆంధ్ర ప్రదేశ్ మహానగర ప్రాంతం మరియు పట్టణాభివృద్ధి చట్టము, 2016 నందలి సెక్షన్ 7(1) (హెచ్) అనుసరించి, సూచిక 2 నందు వైస్-చైర్మన్, బొబ్బిలి పట్టణాభివృద్ధి సంస్థ, బొబ్బిలి వారు జారీ చేసిన అధికార బదలాయింపు ఉత్తర్వులను అనుసరించి, సూచిక 3 నందలి ప్రభుత్వ ఉత్తర్వులలో జారీ చేయబడిన భవన నియమాలకు లోబడి, మీరు దరఖాస్తు చేసుకొనిన భవన నిర్మాణ దరఖాస్తును షరతులతో కూడిన అనుమతులు జారీ చేయడం జరుగుతున్నది.</p>

                    <table className='min-w-full'>
                        <thead className='border border-gray-900 '>
                            <tr>
                                <th className='border-r border-neutral-500 p-2 text-center'>A</th>
                                <th colSpan={4} className='p-2 text-center'>దరఖాస్తు దారులు మరియు ఎల్.టి.పి వివరములు</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border border-gray-900'>
                                <td className='p-2 border-r border-neutral-500 text-center'>1</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>దరఖాస్తుదారులు</td>
                                <td colSpan={3} className='text-center'>Owner name</td>
                            </tr>
                            <tr className='border border-gray-900'>
                                <td className='p-2 border-r border-neutral-500 text-center'>2</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>లైసెన్సుడ్ టెక్నికల్ పర్సన్</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>Ltp name</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>లైసెన్స్ నెం</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>Lic no & validity</td>
                            </tr>
                            <tr className='border border-gray-900'>
                                <th className='p-2 border-r border-neutral-500 text-center'>B</th>
                                <td colSpan={4} className='border-r border-neutral-500 text-center font-semibold'>స్థల వివరములు</td>
                            </tr>
                            <tr className='p-2 border border-gray-900'>
                                <td className='p-2 border-r border-neutral-500 text-center'>1</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>సర్వే నెం.</td>
                                <td colSpan={3} className='p-2 border-r border-neutral-500'>Survey no</td>
                            </tr>
                            <tr className='p-2 border border-gray-900'>
                                <td className='p-2 border-r border-neutral-500 text-center'>2</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>డోర్ నెం.</td>
                                <td colSpan={3} className='p-2 border-r border-neutral-500'>Door no</td>
                            </tr>
                            <tr className='p-2 border border-gray-900'>
                                <td className='p-2 border-r border-neutral-500 text-center'>3</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>ప్లాట్ నెం.</td>
                                <td colSpan={3} className='p-2 border-r border-neutral-500'>Plot no (confusion)</td>
                            </tr>
                            <tr className='p-2 border border-gray-900'>
                                <td className='p-2 border-r border-neutral-500 text-center'>4</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>గ్రామము</td>
                                <td colSpan={3} className='p-2 border-r border-neutral-500'>Village name</td>
                            </tr>
                            <tr className='p-2 border border-gray-900'>
                                <td className='p-2 border-r border-neutral-500 text-center'>5</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>గ్రామ పంచాయతీ</td>
                                <td colSpan={3} className='p-2 border-r border-neutral-500'>Grama panchayat name</td>
                            </tr>
                            <tr className='p-2 border border-gray-900'>
                                <td className='p-2 border-r border-neutral-500 text-center'>6</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>మండలం</td>
                                <td colSpan={3} className='p-2 border-r border-neutral-500'>Mandal name</td>
                            </tr>
                            <tr className='p-2 border border-gray-900'>
                                <td className='p-2 border-r border-neutral-500 text-center'>7</td>
                                <td className='p-2 border-r border-neutral-500 text-center'>జిల్లా</td>
                                <td colSpan={3} className='p-2 border-r border-neutral-500'>District name</td>
                            </tr>
                            <tr className='border border-gray-900'>
                                <th className='p-2 border-r border-neutral-500 text-center'>C</th>
                                <td colSpan={5} className='border-r border-neutral-500 text-center font-semibold'>అనుమతి వివరములు</td>
                            </tr>
                            <tr className='p-2 border border-gray-900'>
                                <td className='p-2 border-r border-neutral-500 text-center'>1</td>
                                <td rowSpan={2} className='p-2 border-r border-neutral-500 text-center'>సెట్-బాక్స్ (మీ)</td>
                                <td className='p-2 border-r border-neutral-500'>ముందు</td>
                                <td className='p-2 border-r border-neutral-500'>ముందు</td>
                                <td className='p-2 border-r border-neutral-500'>ముందు</td>
                                <td className='p-2 border-r border-neutral-500'>ముందు</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </div >
    );
};

export default ProceedingModal;