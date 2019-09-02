import React, {useState, useEffect} from 'react';
import api from '../../sevices/api';

type Issues = Array<Issue>
interface User {
  avatar_url: String
}

interface Labels {
  name: string
  color: string
}

interface Issue {
  title: String
  body: String
  user: User
  labels: Array<Labels>
}

export default function Home() {
  const [issues, setIssues] = useState<Issues>([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get(`/repos/frontendbr/vagas/issues`)
      console.log(data)
      setIssues(data);
      // ...
    }
    fetchData()
  }, []);

  return(
    <div>
      <form>
        {issues.map((issue: Issue) => (
          <div>
            <div>{issue.title}</div>
            <div>{issue.body}</div><br></br><br></br>
            {issue.labels.map((label: Labels) => (
              <div>
                {console.log(label.color)}
                <span style={{backgroundColor: `#${label.color}`}}>{label.name}</span>
              </div>
            ))}
          </div>
        )
        )}
      </form>
    </div>
  )
}