import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  contactText: {
    fontSize: 10,
    marginHorizontal: 5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
});

interface ResumePDFProps {
  data: {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      summary: string;
    };
    experience: {
      company: string;
      position: string;
      duration: string;
      description: string;
    };
    education: {
      school: string;
      degree: string;
      year: string;
    };
    skills: string;
  };
}

export const ResumePDF = ({ data }: ResumePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.section}>
        <Text style={styles.header}>{data.personalInfo.fullName}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>{data.personalInfo.email}</Text>
          <Text style={styles.contactText}>•</Text>
          <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactText}>•</Text>
          <Text style={styles.contactText}>{data.personalInfo.location}</Text>
        </View>
      </View>

      {/* Summary */}
      {data.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Professional Summary</Text>
          <Text style={styles.text}>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Work Experience</Text>
        <Text style={styles.text}>{data.experience.position}</Text>
        <Text style={styles.text}>{data.experience.company}</Text>
        <Text style={styles.text}>{data.experience.duration}</Text>
        <Text style={styles.text}>{data.experience.description}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Education</Text>
        <Text style={styles.text}>{data.education.degree}</Text>
        <Text style={styles.text}>{data.education.school}</Text>
        <Text style={styles.text}>{data.education.year}</Text>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Skills</Text>
        <View style={styles.skills}>
          {data.skills.split(',').map((skill, index) => (
            <Text key={index} style={styles.text}>
              {skill.trim()}
            </Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export const PDFDownloadButton = ({ data }: ResumePDFProps) => (
  <PDFDownloadLink
    document={<ResumePDF data={data} />}
    fileName={`${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`}
  >
    {({ blob, url, loading, error }) => 
      loading ? 'Generating PDF...' : 'Download PDF'
    }
  </PDFDownloadLink>
);

