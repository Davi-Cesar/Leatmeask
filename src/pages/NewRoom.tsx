import { Link, useHistory } from 'react-router-dom';
import { FormEvent } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/UseAuth';
import { useState } from 'react';
import { database } from '../services/firebase';

import '../styles/auth.scss'

export function NewRoom() {
    const  { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');
    
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        //verificar se existe algum texto em newRoom
        if(newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustação depergunta e respostas" />
                <strong>Crie salas de Q&amp;E ao-vivo</strong>
                <p>Tires as dúvidas da sua audiêndia em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                        <p>
                            Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}