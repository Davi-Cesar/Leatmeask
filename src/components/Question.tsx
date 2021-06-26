import { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/question.scss';

type QuestionPros = {
    content: string,
    author: {
        name: string,
        avatar: string,
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
    children,
}: QuestionPros) {
    return (
        <div className={
            cx(
                'question',
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered },
                // `question ${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}`
            )}
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    );
}