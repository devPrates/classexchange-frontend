import { ChevronRight, FileText, GitPullRequest, GitPullRequestClosed, MailCheckIcon } from "lucide-react";

export default function About() {
    return (
        <section className="py-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
                  <div className="relative w-full text-center lg:text-left lg:w-2/4">
                      <h2 className="text-4xl font-extrabold leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">Conheça o Software Class Exchange</h2>
                  </div>
                  <div className="relative w-full text-center  lg:text-left lg:w-2/4">
                      <p className="text-lg font-normal text-gray-500 mb-5">Oferecemos todas as vantagens que podem simplificar todas as suas trocas ou substiuições de aula sem quaisquer complicações</p> 
                      <a href="#" className="flex flex-row items-center justify-center gap-2 text-base font-semibold text-green-600 lg:justify-start hover:text-green-700 ">Entre em contato <ChevronRight />
                          </a> 
                  </div>
              </div>
              <div className="flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                          <GitPullRequest />
                              
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Easy Payment</h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          We Provide Various Methods For You To Carry Out All Transactions Related To Your Finances 
                      </p>
                  </div>
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                          <GitPullRequestClosed />
                              
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Safe Transaction</h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          We have the most up-to-date security to support the security of all our customers in carrying out all transactions.  
                      </p>
                  </div>
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                         <FileText />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Fast Customer Service </h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          Provide Customer Service For Those Of You Who Have Problems 24 Hours A Week  
                      </p>
                  </div>
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                         <MailCheckIcon />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Quick Transaction</h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          We provide faster transaction speeds than competitors, so money arrives and is received faster. 
                      </p>
                  </div>
              </div>
        </div>
      </section>
    )
}