'use client'

import { db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import QuizClient from './_components/quiz-client'

function Page() {
	const { id } = useParams()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [questions, setQuestions] = useState<any[] | null>(null)
	useEffect(() => {
		const fetchQuestions = async () => {
      if (!id || typeof id !== 'string') return;

      try {
        const q = query(
          collection(db, 'questions'),
          where('quizId', '==', id)
        );

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setQuestions(data);
        console.log(data);
      } catch (error) {
        console.error('Ошибка при получении вопросов:', error);
      }
    };

    fetchQuestions();
  }, [id]);
	return (
		<section className='flex flex-col'>
			{questions && <QuizClient questions={questions} />}
		</section>
	)
}

export default Page
