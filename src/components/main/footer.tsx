import { Mail, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Footer() {
    return (
        <footer className=" py-12 px-8 border-t-[1px]">
            <div className="max-w-6xl max-lg:max-w-screen-md mx-auto">
                <div className="grid max-md-grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h4 className="font-bold text-lg">Sobre Nós</h4>
                        <p className="text-sm mt-6 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida,
                            mi eu pulvinar cursus, sem elit interdum mauris dipiscing elit. Aenean gravida,
                            mi eu pulvinar cursus... <a href='' className="text-sm font-semibold text-[#007bff]">Read
                                more</a></p>

                        <ul className="grid sm:grid-cols-2 mt-12 gap-2">
                            <li className="flex items-center max-sm:mb-8">
                                <div className="bg-[#21c45d] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <Phone />
                                </div>
                                <a href="" className="text-sm ml-4">
                                    <small className="block">Tel</small>
                                    <strong>180-548-2588</strong>
                                </a>
                            </li>
                            <li className="flex items-center">
                                <div className="bg-[#21c45d] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <Mail />
                                </div>
                                <a href="" className="text-sm ml-4">
                                    <small className="block">Mail</small>
                                    <strong>info@example.com</strong>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg">Newsletter</h4>
                        <p className="text-sm mt-6 leading-relaxed">Subscribe to our newsletter and stay up to date with the latest news,
                            updates, and exclusive offers. Get valuable insights. Join our community today!</p>

                        <div className="flex px-2 py-1  mt-12 gap-2">
                            <Input type='email' placeholder='Digite seu Email'
                                className="w-full outline-none text-sm bg-transparent pl-4" />
                            <Button>Enviar</Button>
                        </div>

                    </div>
                </div>

                <div className="lg:flex lg:item-center mt-12">
                    <ul className="flex flex-wrap gap-4">
                        <li>
                            <a href='' className='hover:text-gray-200 text-sm'>Termos de Serviço</a>
                        </li>
                        <li>
                            <a href='' className='hover:text-gray-200 text-sm'>Política de Privacidade</a>
                        </li>
                        <li>
                            <a href='' className='hover:text-gray-200 text-sm'>Segurança</a>
                        </li>
                    </ul>

                    <p className='text-sm lg:ml-auto max-lg:mt-6'>© ClassExchange. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}