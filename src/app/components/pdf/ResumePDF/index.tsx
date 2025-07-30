// components/pdf/ResumePDF.tsx
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingRight: 24,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  sidebar: {
    width: '32%',
    paddingLeft: 16,
    paddingVertical: 24,
    borderRight: '1px solid #eee',
   backgroundColor: '#2fff00',
  },
  main: {
    width: '68%',
    paddingLeft: 16,
    paddingVertical: 24,
  },
  section: { marginBottom: 14 },
  heading: { fontSize: 15, fontWeight: 'bold', marginBottom: 6, color: '#1a202c' },
  item: { marginBottom: 6 },
  label: { fontWeight: 'bold' },
  list: { marginLeft: 10, marginBottom: 2 },
  bullet: { marginRight: 4 },
  small: { fontSize: 10, color: '#555' },
  link: { color: '#2563eb', textDecoration: 'underline' },
  chip: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 2,
    fontSize: 10,
    color: '#222'
  }
});

export function ResumePDF({ resume }) {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 2 }}>{resume.name}</Text>
          <Text style={{ marginBottom: 8 }}>{resume.title}</Text>
          <Text style={styles.small}>{resume.contact.email}</Text>
          <Text style={styles.small}>{resume.contact.phone}</Text>
          <Text style={styles.small}>{resume.contact.location}</Text>
          {resume.contact.website && (
            <Text style={styles.small}>{resume.contact.website}</Text>
          )}
          {/* Profiles */}
          {resume.profiles?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Profiles</Text>
              {resume.profiles.map((p, i) => (
                <Text key={i} style={styles.small}>
                  {p.platform}: <Link style={styles.link} src={p.url}>{p.username}</Link>
                </Text>
              ))}
            </View>
          )}
          {/* Skills */}
          {resume.skills?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Skills</Text>
              {resume.skills.map((group, i) => (
                <View key={i} style={styles.item}>
                  <Text style={styles.label}>{group.category} ({group.level})</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 2 }}>
                    {(group.items ?? []).map((item, j) => (
                      <Text key={j} style={styles.chip}>{item}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
          {/* Languages */}
          {resume.languages?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Languages</Text>
              {resume.languages.map((lang, i) => (
                <Text key={i} style={styles.small}>
                  {lang.name} ({lang.proficiency})
                </Text>
              ))}
            </View>
          )}
          {/* Awards */}
          {resume.awards?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Awards</Text>
              {resume.awards.map((award, i) => (
                <View key={i} style={styles.item}>
                  <Text style={styles.label}>{award.title}</Text>
                  {award.issuer && <Text style={styles.small}>{award.issuer}</Text>}
                  {award.date && <Text style={styles.small}>{award.date}</Text>}
                  {award.description && <Text style={styles.small}>{award.description}</Text>}
                </View>
              ))}
            </View>
          )}
          {/* Certifications */}
          {resume.certifications?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Certifications</Text>
              {resume.certifications.map((cert, i) =>
                typeof cert === "string" ? (
                  <Text key={i} style={styles.small}>{cert}</Text>
                ) : (
                  <Text key={i} style={styles.small}>
                    {cert.name} {cert.date && `(${cert.date})`}
                  </Text>
                )
              )}
            </View>
          )}
          {/* Interests/Hobbies */}
          {(resume.hobbies?.length > 0 || resume.interests?.length > 0) && (
            <View style={styles.section}>
              <Text style={styles.heading}>Interests</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {[...(resume.hobbies ?? []), ...(resume.interests ?? [])].map((h, i) => (
                  <Text key={i} style={styles.chip}>{h}</Text>
                ))}
              </View>
            </View>
          )}
          {/* References */}
          {resume.references?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>References</Text>
              {resume.references.map((ref, i) => (
                <View key={i} style={styles.item}>
                  <Text style={styles.label}>{ref.name}</Text>
                  <Text style={styles.small}>{ref.position}</Text>
                  <Text style={styles.small}>{ref.contact}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        {/* Main Content */}
        <View style={styles.main}>
          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text>{resume.summary}</Text>
          </View>
          {/* Experience */}
          {resume.experience?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Experience</Text>
              {resume.experience.map((exp, i) => (
                <View key={i} style={styles.item}>
                  <Text style={styles.label}>{exp.company} - {exp.role}</Text>
                  <Text style={styles.small}>{exp.startDate} to {exp.endDate} | {exp.location}</Text>
                  <Text style={styles.small}>{exp.description}</Text>
                  {(exp.highlights ?? []).map((h, j) => (
                    <Text key={j} style={styles.small}>• {h}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}
          {/* Education */}
          {resume.education?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Education</Text>
              {resume.education.map((edu, i) => (
                <View key={i} style={styles.item}>
                  <Text style={styles.label}>{edu.school}</Text>
                  <Text style={styles.small}>{edu.degree} ({edu.startDate} - {edu.endDate})</Text>
                  <Text style={styles.small}>{edu.location}</Text>
                  {edu.honors && <Text style={styles.small}>{edu.honors}</Text>}
                  {(edu.relevantCoursework ?? []).length > 0 && (
                    <Text style={styles.small}>
                      Coursework: {(edu.relevantCoursework ?? []).join(", ")}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
          {/* Projects */}
          {resume.projects?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Projects</Text>
              {resume.projects.map((proj, i) => (
                <View key={i} style={styles.item}>
                  <Text style={styles.label}>{proj.title}</Text>
                  <Text style={styles.small}>{proj.role}</Text>
                  <Text style={styles.small}>{proj.description}</Text>
                  {proj.url && (
                    <Link style={styles.link} src={proj.url}>{proj.url}</Link>
                  )}
                </View>
              ))}
            </View>
          )}
          {/* Publications */}
          {resume.publications?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Publications</Text>
              {resume.publications.map((pub, i) => (
                <View key={i} style={styles.item}>
                  <Text style={styles.label}>{pub.title}</Text>
                  <Text style={styles.small}>{pub.publisher} {pub.date && `(${pub.date})`}</Text>
                  {pub.url && (
                    <Link style={styles.link} src={pub.url}>{pub.url}</Link>
                  )}
                </View>
              ))}
            </View>
          )}
          {/* Volunteering */}
          {resume.volunteering?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Volunteering</Text>
              {resume.volunteering.map((vol, i) => (
                <View key={i} style={styles.item}>
                  <Text style={styles.label}>{vol.organization}</Text>
                  <Text style={styles.small}>{vol.role} ({vol.startDate} - {vol.endDate})</Text>
                  <Text style={styles.small}>{vol.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}